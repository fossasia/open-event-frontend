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

    let scheduledSessions = await eventDetails.query('sessions', {
      include : 'speakers,microlocation',
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
        resourceId : session.microlocation.get('id')
      });
    });

    let unscheduledSessions = await eventDetails.query('sessions', {
      include : 'speakers',
      filter  : unscheduledFilterOptions
    });

    let microlocations = await eventDetails.query('microlocations', {});
    let resources = [];
    microlocations.forEach(function(element) {
      resources.push({ id: element.id, title: element.name });
    });

    return {
      defaultView     : 'agendaDay', // also change buttons on top right to allow switching to agendaDay and timeline view
      groupByResource : true,
      events          : scheduled,
      resources,
      unscheduled     : unscheduledSessions
    };
  }
});
