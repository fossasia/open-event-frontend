import Controller from '@ember/controller';
import $ from 'jquery';

export default Controller.extend({
  header: {
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
    }
  }
});
