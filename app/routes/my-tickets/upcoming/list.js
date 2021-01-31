import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import moment from 'moment';

@classic
export default class ListRoute extends Route {
  titleToken() {
    switch (this.params.ticket_status) {
      case 'completed':
        return this.l10n.t('Completed');
      case 'open':
        return this.l10n.t('Open');
    }
  }

  model(params) {
    this.set('params', params);
    const filterOptions = [];
    if (params.ticket_status === 'completed') {
      filterOptions.push(
        {
          and: [
            {
              name : 'event',
              op   : 'has',
              val  : {
                name : 'starts-at',
                op   : 'ge',
                val  : moment().toISOString()
              }
            },
            { or: [
              {
                name : 'status',
                op   : 'eq',
                val  : 'completed'
              },
              {
                name : 'status',
                op   : 'eq',
                val  : 'placed'
              }
            ] },
            {
              name : 'event',
              op   : 'has',
              val  : {
                name : 'deleted-at',
                op   : 'eq',
                val  : null
              }
            }
          ]
        }
      );
    } else if (params.ticket_status === 'open') {
      filterOptions.push(
        {
          and: [
            {
              name : 'event',
              op   : 'has',
              val  : {
                name : 'starts-at',
                op   : 'ge',
                val  : moment().toISOString()
              }
            },
            { or: [
              {
                name : 'status',
                op   : 'eq',
                val  : 'pending'
              },
              {
                name : 'status',
                op   : 'eq',
                val  : 'initializing'
              }
            ] },
            {
              name : 'event',
              op   : 'has',
              val  : {
                name : 'deleted-at',
                op   : 'eq',
                val  : null
              }
            }
          ]
        }
      );
    }

    return this.infinity.model('orders', {
      include      : 'event,attendees.ticket',
      filter       : filterOptions,
      perPage      : 10,
      startingPage : 1,
      sort         : 'event.starts-at',
      perPageParam : 'page[size]',
      pageParam    : 'page[number]',
      store        : this.authManager.currentUser
    });
  }
}
