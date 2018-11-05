import Controller from '@ember/controller';
import $ from 'jquery';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  isSchedulePublished: computed('model.eventDetails.schedulePublishedOn', function() {
    return this.get('model.eventDetails.schedulePublishedOn').toISOString() !== moment(0).toISOString();

  }),
  isLoading : false,
  header    : {
    left   : 'today prev,next',
    center : 'title',
    right  : 'timelineDay,timelineThreeDays,agendaWeek,month'
  },
  views: {
    timelineThreeDays: {
      type     : 'timeline',
      duration : { days: 3 }
    }
  },
  updateSession(start, end, microlocationId, sessionId) {
    let payload = {
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
    let config = {
      skipDataTransform: true
    };
    return this.get('loader')
      .patch(`sessions/${sessionId}`, JSON.stringify(payload), config)
      .then(() => {
        this.get('notify').success('Changes have been made successfully');
      })
      .catch(reason => {
        this.set('error', reason);
        this.get('notify').error(`Error: ${reason}`);
      });
  },
  unscheduleSession(session) {
    $('.full-calendar').fullCalendar('removeEvents', session._id);
    this.updateSession(null, null, session.resourceId, session.serverId);
    this.get('target').send('refresh');

  },
  actions: {
    drop(date, jsEvent, ui, resourceId) {
      let start = date;
      let duration = this.get('model.defaultDuration').split(':');
      let end = start.clone().add(duration[0], 'hours').add(duration[1], 'minutes');
      this.updateSession(start, end, resourceId, $(ui.helper).data('serverId'));
      $(ui.helper).remove();
    },
    eventDrop(session) {
      this.updateSession(session.start, session.end, session.resourceId, session.serverId);
    },
    eventResize(session) {
      this.updateSession(session.start, session.end, session.resourceId, session.serverId);
    },
    eventRender(session, element) {
      element.append('<span class="scheduled-close-btn"><i class="x icon"></i></span>');
      let controller = this;
      element.find('.scheduled-close-btn').on('click', function() {
        controller.unscheduleSession(session);
      });
    },
    togglePublishState() {
      this.set('isLoading', true);
      let isSchedulePublished = this.get('isSchedulePublished');
      let action = isSchedulePublished ? 'unpublished' : 'published';
      let publishedAt = isSchedulePublished ? moment(0) : moment();
      let event = this.get('model.eventDetails');
      event.set('schedulePublishedOn', publishedAt);
      event.save()
        .then(() => {
          this.get('notify').success(`The schedule has been ${action} successfully`);
        })
        .catch(reason => {
          this.set('error', reason);
          this.get('notify').error(`Error: ${reason}`);
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
