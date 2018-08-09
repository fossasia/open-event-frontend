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

    let eventDetails = this.modelFor('events.view');

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
      defaultView     : 'agendaDay',
      groupByResource : true,
      events          : [{
        title      : 'Session 1',
        start      : '2018-08-06T07:08:08',
        end        : '2017-08-06T09:08:08',
        resourceId : 'a'
      }, {
        title      : 'Session 2',
        start      : '2018-08-06T10:08:08',
        end        : '2018-08-06T13:08:08',
        resourceId : 'b'
      }, {
        title      : 'Session 3',
        start      : '2018-08-06T07:08:08',
        end        : '2018-08-06T09:48:08',
        resourceId : 'c'
      }, {
        title      : 'Session 4',
        start      : '2018-08-06T09:15:08',
        end        : '2018-08-06T11:08:08',
        resourceId : 'd'
      }],
      resources,
      unscheduled: unscheduledSessions
    };
  }
});
