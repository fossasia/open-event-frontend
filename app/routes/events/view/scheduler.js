import Route from '@ember/routing/route';
import $ from 'jquery';

// TODO(Areeb): Remove once upgraded
// Workaround for https://github.com/fossasia/open-event-frontend/issues/4729
function patchFullCalendar() {
  if (!window?.FullCalendar) {return}
  window.FullCalendar.EventRenderer.prototype.renderFgSegEls = function(segs, disableResizing) {
    let _this = this;
    if (disableResizing === void 0) { disableResizing = false }
    let hasEventRenderHandlers = this.view.hasPublicHandlers('eventRender');
    let html = '';
    let renderedSegs = [];
    let i;
    if (segs.length) {
      // build a large concatenation of event segment HTML
      for (i = 0; i < segs.length; i++) {
        this.beforeFgSegHtml(segs[i]);
        html += this.fgSegHtml(segs[i], disableResizing);
      }
      // Grab individual elements from the combined HTML string. Use each as the default rendering.
      // Then, compute the 'el' for each segment. An el might be null if the eventRender callback returned false.
      $(html).each(function(i, node) {
        let seg = segs[i];
        let el = $(node);
        // Areeb: seg is undefined for single day events as i > seg.length due to some logical error
        if (seg && hasEventRenderHandlers) { // Areeb: Added `seg && `
          el = _this.filterEventRenderEl(seg.footprint, el);
        }
        if (seg && el) { // Areeb: Added `seg && `
          el.data('fc-seg', seg); // used by handlers
          seg.el = el;
          renderedSegs.push(seg);
        }
      });
    }
    return renderedSegs;
  };
}

export default Route.extend({
  titleToken() {
    return this.l10n.t('Scheduler');
  },
  actions: {
    refresh() {
      this.refresh();
    }
  },
  async model() {
    patchFullCalendar();
    let unscheduledFilterOptions = [
      {
        and: [
          {
            or: [
              {
                name : 'starts-at',
                op   : 'eq',
                val  : null
              },
              {
                name : 'ends-at',
                op   : 'eq',
                val  : null
              }
            ]
          },
          {
            or: [
              {
                name : 'state',
                op   : 'eq',
                val  : 'accepted'
              },
              {
                name : 'state',
                op   : 'eq',
                val  : 'confirmed'
              }
            ]
          }
        ]
      }
    ];

    let scheduledFilterOptions = [
      {
        and: [
          {
            name : 'starts-at',
            op   : 'ne',
            val  : null
          },
          {
            name : 'ends-at',
            op   : 'ne',
            val  : null
          },
          {
            or: [
              {
                name : 'state',
                op   : 'eq',
                val  : 'accepted'
              },
              {
                name : 'state',
                op   : 'eq',
                val  : 'confirmed'
              }
            ]
          }
        ]
      }
    ];

    let eventDetails = this.modelFor('events.view');

    let validRange = {
      start : eventDetails.startsAt.format('YYYY-MM-DD'),
      end   : eventDetails.endsAt.clone().add(1, 'day').format('YYYY-MM-DD')
    };

    let durationDays = eventDetails.endsAt.diff(eventDetails.startsAt, 'days') + 1;
    let views = {
      timelineThreeDays: {
        type       : 'agenda',
        duration   : { days: durationDays },
        buttonText : `${durationDays} day`
      }
    };

    let header = {
      left   : 'today,prev,next',
      center : 'title',
      right  : 'agendaDay,timelineThreeDays,agendaWeek'
    };

    let scheduledSessions = await eventDetails.query('sessions', {
      include      : 'speakers,microlocation,track',
      filter       : scheduledFilterOptions,
      'page[size]' : 0
    });

    let scheduled = []; // to convert sessions data to fullcalendar's requirements
    scheduledSessions.forEach(function(session) {
      let speakerNames = [];
      session.speakers.forEach(function(speaker) {
        speakerNames.push(speaker.name);
      });
      scheduled.push({
        title      : `${session.title} | ${speakerNames.join(', ')}`,
        start      : session.startsAt.format(),
        end        : session.endsAt.format(),
        resourceId : session.microlocation.get('id'),
        color      : session.track.get('color'),
        serverId   : session.get('id') // id of the session on BE
      });
    });

    let unscheduledSessions = await eventDetails.query('sessions', {
      include      : 'speakers,track',
      filter       : unscheduledFilterOptions,
      'page[size]' : 0
    });

    let microlocations = await eventDetails.query('microlocations', {});
    let resources = [];
    microlocations.forEach(function(element) {
      resources.push({ id: element.id, title: element.name });
    });

    /*
    The start hour of the start day is considered the start hour for remaining days as well.
    The end hour of the last day is considered the end hour for remaining days as well.
    */

    return {
      header,
      timezone        : 'UTC',
      defaultView     : 'agendaDay',
      events          : scheduled,
      eventDetails,
      resources,
      unscheduled     : unscheduledSessions,
      minTime         : eventDetails.startsAt.format('HH:mm:ss'),
      maxTime         : eventDetails.endsAt.format('HH:mm:ss'),
      validRange,
      views,
      defaultDuration : '01:00'
    };
  }
});
