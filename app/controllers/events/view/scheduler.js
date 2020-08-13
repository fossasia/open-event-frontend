import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import moment from 'moment';

export default class extends Controller {
  @computed('model.eventDetails.schedulePublishedOn')
  get isSchedulePublished() {
    const schedulePublishStatus = this.model.eventDetails.schedulePublishedOn;
    if (schedulePublishStatus != null) {
      return schedulePublishStatus.toISOString() !== moment(0).toISOString();
    }
    return false;
  }

  isLoading = false;
  header    = {
    left   : 'today prev,next',
    center : 'title',
    right  : 'timelineDay,timelineThreeDays,agendaWeek,month'
  }

  view = {
    timelineThreeDays: {
      type     : 'timeline',
      duration : { days: 3 }
    }
  }

  updateSession(start, end, microlocationId, sessionId) {
    const payload = {
      data: {
        attributes: {
          'starts-at' : start ? start.toISOString() : null,
          'ends-at'   : end ? end.toISOString() : null
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
        this.notify.success('Changes have been made successfully',
          {
            id: 'schedu_change'
          });
      })
      .catch(reason => {
        this.set('error', reason);
        this.notify.error(`Error: ${reason}`);
      });
  }

  unscheduleSession(session) {
    window.$('.full-calendar').fullCalendar('removeEvents', session._id);
    this.updateSession(null, null, session.resourceId, session.serverId);
    this.target.send('refresh');
  }

  @action
  drop(date, jsEvent, ui, resourceId) {
    const start = date;
    const duration = this.model.defaultDuration.split(':');
    const end = start.clone().add(duration[0], 'hours').add(duration[1], 'minutes');
    this.updateSession(start, end, resourceId, window.$(ui.helper).data('serverId'));
    window.$(ui.helper).remove();
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
  togglePublishState() {
    this.set('isLoading', true);
    const stat = this.isSchedulePublished ? 'unpublished' : 'published';
    const publishedAt = this.isSchedulePublished ? moment(0) : moment();
    const event = this.model.eventDetails;
    event.set('schedulePublishedOn', publishedAt);
    event.save()
      .then(() => {
        this.notify.success(`The schedule has been ${stat} successfully`,
          {
            id: 'schedule_change_succ'
          });
      })
      .catch(reason => {
        this.set('error', reason);
        this.notify.error(`Error: ${reason}`,
          {
            id: 'error_reason_scheduler'
          });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
