import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class ScheduleRoute extends Route {
  titleToken() {
    return this.l10n.t('Schedule');
  }

  async model() {
    const event = this.modelFor('public');

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


    const validRange = {
      start : event.startsAt.format('YYYY-MM-DD'),
      end   : event.endsAt.clone().add(1, 'day').format('YYYY-MM-DD')
    };

    const durationDays = event.endsAt.diff(event.startsAt, 'days') + 1;
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
      right  : 'timelineDay,timelineThreeDays,agendaWeek'
    };

    const scheduledSessions = await event.query('sessions', {
      include : 'speakers,microlocation,track',
      filter  : scheduledFilterOptions
    });

    const scheduled = []; // to convert sessions data to fullcalendar's requirements
    scheduledSessions.forEach(function(session) {
      const speakerNames = [];
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

    const microlocations = await event.query('microlocations', {});
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
      defaultView     : 'agendaDay',
      events          : scheduled,
      timezone        : 'UTC',
      event,
      resources,
      minTime         : event.startsAt.format('HH:mm:ss'),
      maxTime         : event.endsAt.format('HH:mm:ss'),
      validRange,
      views,
      defaultDuration : '01:00'
    };

  }
}
