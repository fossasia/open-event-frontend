import Component from '@glimmer/component';
import { action } from '@ember/object';
import Event from 'open-event-frontend/models/event';
import Session from 'open-event-frontend/models/session';
import Microlocation from 'open-event-frontend/models/microlocation';
import Speaker from 'open-event-frontend/models/speaker';
import moment from 'moment';
import $ from 'jquery';
import { isTesting } from 'open-event-frontend/utils/testing';

interface ScheduleArgs {
  event: Event,
  sessions: Session[],
  rooms: Microlocation[]
}

export default class Schedule extends Component<ScheduleArgs> {
  header = {
    left   : 'prev,next',
    center : 'title',
    right  : 'timelineDay,agendaDay,timelineThreeDays,agendaWeek'
  }

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
    return this.args.event.timezone;
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
      return {
        title      : `${session.title} | ${speakerNames}`,
        start      : session.startsAt.tz(this.timezone).format(),
        end        : session.endsAt.tz(this.timezone).format(),
        resourceId : session.microlocation.get('id'),
        color      : session.track.get('color'),
        serverId   : session.get('id') // id of the session on BE
      };
    });
  }

  @action
  renderCallback(view: FullCalendarView): void {
    if (isTesting || !(view.type === 'agendaDay' || view.type === 'timelineDay')) {return}

    let minTime = '0:00:00';
    let maxTime = '24:00:00';
    if (view.start.isSame(this.args.event.startsAt, 'day')) {
      ({ minTime } = this);
    }
    if (view.start.isSame(this.args.event.endsAt, 'day')) {
      ({ maxTime } = this);
    }

    if (minTime !== view.options.minTime) {
      $('.full-calendar').fullCalendar('option', 'minTime', minTime);
    }

    if (maxTime !== view.options.maxTime) {
      $('.full-calendar').fullCalendar('option', 'maxTime', maxTime);
    }
  }
}

interface FullCalendarView {
  type: string;
  start: moment.Moment;
  end: moment.Moment;
  options: { minTime: string; maxTime: string }
}
