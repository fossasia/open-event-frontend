import Controller from '@ember/controller';
import $ from 'jquery';

export default Controller.extend({

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
    },

    eventDrop(session) {
      this.updateSession(session.start, session.end, session.resourceId, session.serverId);
    },
    eventReceive(session) {
      $(`#${session.id}`).remove(); // removes the session from the unscheduled list
    },
    eventResize(session) {
      this.updateSession(session.start, session.end, session.resourceId, session.serverId);
    },
    eventRender(session, element) {
      element.append('<span class="remove-btn">X</span>');
      let self = this;
      element.find('.remove-btn').on('click', function() {
        $('.full-calendar').fullCalendar('removeEvents', session._id);

        // following functionality (to add back to unscheduled list) can be abstracted out in a different method
        let unscheduled = document.createElement('div');
        unscheduled.setAttribute('class', 'unscheduled ember-view ui-draggable ui-draggable-handle');
        unscheduled.setAttribute('style', 'position: relative;');
        unscheduled.setAttribute('id', Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)); // generate random id

        unscheduled.appendChild(document.createTextNode(session.title));

        $(unscheduled).data('event', {
          title    : session.title, // use the element's text as the event title
          id       : $(unscheduled).attr('id'),
          serverId : session.serverId,
          color    : session.color,
          stick    : true
        });
        $(unscheduled).data('serverId', session.serverId);
        $(unscheduled).draggable({
          zIndex         : 999,
          revert         : true,      // will cause the event to go back to its
          revertDuration : 0  //  original position after the drag
        });
        $(unscheduled).css('background-color', session.color);
        self.updateSession(null, null, session.resourceId, session.serverId); // updates the session on BE
        $('#sessions-list').append(unscheduled);
      });
    }
  }
});
