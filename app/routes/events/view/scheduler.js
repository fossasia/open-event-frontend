import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Scheduler');
  },
  async model() {
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
      resources: [
        { id: 'a', title: 'Auditorium A', eventColor: 'yellow' },
        { id: 'b', title: 'Auditorium B', eventColor: 'green' },
        { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
        { id         : 'd', title      : 'Auditorium D', eventColor : 'blue', children   : [
          { id: 'd1', title: 'Room D1' },
          { id: 'd2', title: 'Room D2' }
        ] }
      ]
    };
  }
});
