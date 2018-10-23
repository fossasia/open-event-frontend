import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Scheduler');
  },
  async model() {
    let unscheduledFilterOptions = [
      {
        and: [
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
      right  : 'timelineDay,timelineThreeDays,agendaWeek,month'
    };

    let scheduledSessions = await eventDetails.query('sessions', {
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
        start      : session.startsAt.format('YYYY-MM-DDTHH:mm:SS'),
        end        : session.endsAt.format('YYYY-MM-DDTHH:mm:SS'),
        resourceId : session.microlocation.get('id'),
        color      : session.track.get('color'),
        serverId   : session.get('id') // id of the session on BE
      });
    });

    let unscheduledSessions = await eventDetails.query('sessions', {
      include : 'speakers,track',
      filter  : unscheduledFilterOptions
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
      defaultView     : 'agendaDay',
      groupByResource : true,
      events          : scheduled,
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
