import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Schedule');
  },

  async model() {
    let event = this.modelFor('public');

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


    let validRange = {
      start : event.startsAt.format('YYYY-MM-DD'),
      end   : event.endsAt.clone().add(1, 'day').format('YYYY-MM-DD')
    };

    let durationDays = event.endsAt.diff(event.startsAt, 'days') + 1;
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
      right  : 'timelineDay,timelineThreeDays,agendaWeek'
    };

    let scheduledSessions = await event.query('sessions', {
      include : 'speakers,microlocation,track',
      filter  : scheduledFilterOptions
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

    let microlocations = await event.query('microlocations', {});
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
});
