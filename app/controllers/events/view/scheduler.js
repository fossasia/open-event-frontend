import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import moment from 'moment';
import { tracked } from '@glimmer/tracking';
import { matchPropertyIn } from 'open-event-frontend/utils/text';
import $ from 'jquery';

export default class extends Controller {
  @tracked filter = '';
  isLoading = false;

  @computed('model.microlocations')
  get microlocations() {
    return this.model.microlocations.sortBy('position').filter(x => !x.hiddenInScheduler);
  }

  @computed('model.unscheduled', 'filter')
  get unscheduledSessions() {
    if (!this.filter || !this.model.unscheduled) {return this.model.unscheduled}

    return this.model.unscheduled.toArray()
      .filter(session => matchPropertyIn(session, this.filter, ['title', 'shortAbstract'])
              || session.speakers.map(speaker => speaker.name).join(',').toLowerCase().includes(this.filter.toLowerCase()));
  }

  async updateSession(start, end, microlocationId, sessionId) {
    if (!start !== !end) {
      // If either one of start or end is missing, then return and throw an error
      // Either both should be present or none

      this.notify.error(this.l10n.t('Start time or End time not present'));
      return;
    }

    if (start && end) {
      start = moment.tz(start.format(), this.model.timezone).toISOString();
      end = moment.tz(end.format(), this.model.timezone).toISOString();
    }

    const payload = {
      data: {
        attributes: {
          'starts-at' : start,
          'ends-at'   : end
        },
        relationships: {
          microlocation: {
            data: {
              type : 'microlocation',
              id   : microlocationId
            }
          }
        },
        type : 'session',
        id   : sessionId
      }
    };
    const config = {
      skipDataTransform: true
    };
    return this.loader
      .patch(`sessions/${sessionId}`, JSON.stringify(payload), config)
      .then(() => {
        this.notify.success(this.l10n.t('Changes have been made successfully'),
          {
            id: 'schedu_change'
          });
      })
      .catch(reason => {
        console('Error while scheduling', reason);
        this.set('error', reason);
        this.notify.error(`Error: ${reason}`);
      });
  }

  async unscheduleSession(session) {
    $('.full-calendar').fullCalendar('removeEvents', session._id);
    await this.updateSession(null, null, session.resourceId, session.serverId);
    this.target.send('refresh');
  }

  @action
  async drop(date, jsEvent, ui, resourceId) {
    const start = date;
    const duration = this.model.defaultDuration.split(':');
    const end = start.clone().add(duration[0], 'hours').add(duration[1], 'minutes');
    await this.updateSession(start, end, resourceId, $(ui.helper).data('serverId'));
    this.target.send('refresh');
  }

  @action
  eventDrop(session) {
    this.updateSession(session.start, session.end, session.resourceId, session.serverId);
  }

  @action
  eventResize(session) {
    this.updateSession(session.start, session.end, session.resourceId, session.serverId);
  }

  @action
  eventRender(session, element) {
    element.append('<span class="scheduled-close-btn"><i class="x icon"></i></span>');
    const controller = this;
    element.find('.scheduled-close-btn').on('click', function() {
      controller.unscheduleSession(session);
    });
  }

  @action
  async togglePublishState() {
    this.set('isLoading', true);
    const { event } = this.model;
    const stat = event.isSchedulePublished ? 'unpublished' : 'published';
    const publishedAt = event.isSchedulePublished ? moment(0) : moment();
    event.set('schedulePublishedOn', publishedAt);
    try {
      await event.save();
      this.notify.success(`The schedule has been ${stat} successfully`,
        {
          id: 'schedule_change_succ'
        });
    } catch (e) {
      console.error('Error while toggling schedule publish state', e);
      this.set('error', e);
      this.notify.error(`Error: ${e}`,
        {
          id: 'error_reason_scheduler'
        });
    } finally {
      this.set('isLoading', false);
    }
  }
}
