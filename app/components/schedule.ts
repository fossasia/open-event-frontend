import Component from '@glimmer/component';
import { action } from '@ember/object';
import Event from 'open-event-frontend/models/event';
import Session from 'open-event-frontend/models/session';
import Microlocation from 'open-event-frontend/models/microlocation';
import Speaker from 'open-event-frontend/models/speaker';
import moment from 'moment';
import $ from 'jquery';
import { isTesting } from 'open-event-frontend/utils/testing';
import { getTextColor } from 'open-event-frontend/utils/color';
import { tracked } from '@glimmer/tracking';
import { next } from '@ember/runloop';

interface ScheduleArgs {
  timezone: string | undefined,
  isPublic: boolean | undefined,
  event: Event,
  sessions: Session[],
  rooms: Microlocation[]
}

export default class Schedule extends Component<ScheduleArgs> {
  header = {
    left   : 'prev,next',
    center : 'title',
    right  : 'agendaDay,timelineThreeDays,agendaWeek'
  }

  @tracked
  render = true;

  get validRange() { // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
    const { event } = this.args;
    return {
      start : event.startsAt.tz(this.timezone).format('YYYY-MM-DD'),
      end   : event.endsAt.clone().tz(this.timezone).add(1, 'day').format('YYYY-MM-DD')
    };
  }

  get views() { // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
    const { event } = this.args;
    const durationDays = event.endsAt.diff(event.startsAt, 'days') + 1;
    return {
      timelineThreeDays: {
        type       : 'agenda',
        duration   : { days: durationDays },
        buttonText : `${durationDays} day`
      }
    };
  }

  get timezone(): string {
    return this.args.timezone || this.args.event.timezone;
  }

  get minTime(): string {
    return this.args.event.startsAt.tz(this.timezone).format('HH:mm:ss');
  }

  get maxTime(): string {
    return this.args.event.endsAt.tz(this.timezone).format('HH:mm:ss');
  }

  get resources() { // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
    return this.args.rooms.map(room => ({ id: room.id, title: room.name }));
  }

  get events() { // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
    return this.args.sessions.map(session => {
      const speakerNames = session.speakers.map((speaker: Speaker) => speaker.name).join(', ');
      const color = session.track.get('color');
      let sessionEndTime = session.endsAt.tz(this.timezone).format();
      if (session.endsAt.tz(this.timezone).format() > this.args.event.endsAt.tz(this.timezone).format()) {
        sessionEndTime = this.args.event.endsAt.tz(this.timezone).format();
      }
      return {
        title      : `${session.title} | ${speakerNames}`,
        start      : session.startsAt.tz(this.timezone).format(),
        end        : sessionEndTime,
        resourceId : session.microlocation.get('id'),
        color,
        textColor  : getTextColor(color),
        serverId   : session.get('id') // id of the session on BE
      };
    });
  }

  /**
   * In default mode, a lot of resources in scheduler lead to a cramped layout
   * where each column is very narrow. This function adjusts the column width
   * and makes it scrollable, making ot easier to add sessions and navigate
   *
   * Copied from here - https://github.com/fullcalendar/fullcalendar/issues/4819#issuecomment-350709156
   * @param view FullCalendarView
   * @param calendar Calendar JQuery element
   * @param columnWidth Resource column width to be set
   */
  adjustColumnWidth(view: FullCalendarView, calendar: JQuery<HTMLElement>, columnWidth = 250): void {
    if (view.type !== 'agendaDay') {return}
    const minColumnWidthInPixels = columnWidth;

    const getContainerWidth = () => calendar.parent().outerWidth();

    const containerWidthInPixels = getContainerWidth();
    const numberOfColumns = calendar.fullCalendar('getResources').length;
    const firstColumnWidthInPixels = calendar.find('.fc-axis.fc-widget-header').outerWidth();
    const sumOfBorderWidthsInPixels = numberOfColumns;
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const expectedTotalWidthInPixels = minColumnWidthInPixels * numberOfColumns
        + firstColumnWidthInPixels!
        + sumOfBorderWidthsInPixels;
    const agendaWidthInPercent = expectedTotalWidthInPixels / containerWidthInPixels! * 100;
    const width = Math.max(agendaWidthInPercent, 100); // should not be more than 100% anyway

    view.el.css('width', width + '%');
  }

  /**
   * Min and max time in fullcandar sets it to every day, but it should only be applied
   * to the first and last day of the event, or else it can cut off hours in other days
   * of the event. This function changes the min and max time of the calendar dynamically
   * based on the current selected day
   * @param view FullCalendarView
   * @param calendar Calendar JQuery element
   */
  adjustMinTime(view: FullCalendarView, calendar: JQuery<HTMLElement>): void {
    if (isTesting || !(view.type === 'timelineDay' || view.type === 'timelineThreeDays')) {return}
    let min_time = '24:00:00';
    if (this.args.isPublic === true) {
      this.args.sessions.map(x => {
        const z = String(x.startsAt.format('HH:mm:ss'));
        if (min_time > z) {
          min_time = z;
        }
      });
    } else {
      min_time = '0:00:00';
    }
    const minTime = min_time;
    const maxTime = '24:00:00';

    // To prevent infinite render loop
    if (minTime !== view.options.minTime) {
      calendar.fullCalendar('option', 'minTime', minTime);
    }

    if (maxTime !== view.options.maxTime) {
      calendar.fullCalendar('option', 'maxTime', maxTime);
    }
  }

  @action
  renderCallback(view: FullCalendarView): void {
    const calendar = $('.full-calendar');
    this.adjustColumnWidth(view, calendar);
    this.adjustMinTime(view, calendar);
  }

  @action
  timezoneUpdated(): void {
    // Workaround to rerender calendar as updating it dynamically
    // is not possible
    this.render = false;
    next(this, () => {
      this.render = true;
    });
  }
}

interface FullCalendarView {
  type: string;
  start: moment.Moment;
  end: moment.Moment;
  el: JQuery<HTMLElement>,
  options: { minTime: string; maxTime: string }
}
