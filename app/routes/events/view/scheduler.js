import Route from '@ember/routing/route';
import { patchFullCalendar } from 'open-event-frontend/utils/patches/fullcalendar';

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
    const unscheduledFilterOptions = [
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

    const scheduledFilterOptions = [
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

    const eventDetails = this.modelFor('events.view');
    const { timezone } = eventDetails;

    const validRange = {
      start : eventDetails.startsAt.format('YYYY-MM-DD'),
      end   : eventDetails.endsAt.clone().add(1, 'day').format('YYYY-MM-DD')
    };

    const durationDays = eventDetails.endsAt.diff(eventDetails.startsAt, 'days') + 1;
    const views = {
      timelineThreeDays: {
        type       : 'agenda',
        duration   : { days: durationDays },
        buttonText : `${durationDays} day`
      }
    };

    const header = {
      left   : 'today,prev,next',
      center : 'title',
      right  : 'agendaDay,timelineThreeDays,agendaWeek'
    };

    const scheduledSessions = await eventDetails.query('sessions', {
      include      : 'speakers,microlocation,track',
      filter       : scheduledFilterOptions,
      'page[size]' : 0
    });

    const scheduled = []; // to convert sessions data to fullcalendar's requirements
    scheduledSessions.forEach(function(session) {
      const speakerNames = [];
      session.speakers.forEach(function(speaker) {
        speakerNames.push(speaker.name);
      });
      scheduled.push({
        title      : `${session.title} | ${speakerNames.join(', ')}`,
        start      : session.startsAt.tz(timezone).format(),
        end        : session.endsAt.tz(timezone).format(),
        resourceId : session.microlocation.get('id'),
        color      : session.track.get('color'),
        serverId   : session.get('id') // id of the session on BE
      });
    });

    const unscheduledSessions = await eventDetails.query('sessions', {
      include      : 'speakers,track',
      filter       : unscheduledFilterOptions,
      'page[size]' : 0
    });

    const microlocations = await eventDetails.query('microlocations', {});
    const resources = [];
    microlocations.forEach(function(element) {
      resources.push({ id: element.id, title: element.name });
    });

    /*
    The start hour of the start day is considered the start hour for remaining days as well.
    The end hour of the last day is considered the end hour for remaining days as well.
    */

    return {
      header,
      timezone,
      defaultView     : 'agendaDay',
      events          : scheduled,
      eventDetails,
      resources,
      unscheduled     : unscheduledSessions,
      minTime         : eventDetails.startsAt.tz(eventDetails.timezone).format('HH:mm:ss'),
      maxTime         : eventDetails.startsAt.tz(eventDetails.timezone).format('HH:mm:ss'),
      validRange,
      views,
      defaultDuration : '01:00'
    };
  }
});
