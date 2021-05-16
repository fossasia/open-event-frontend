import Route from '@ember/routing/route';

export default class ExhibitorsCreateRoute extends Route {

  titleToken() {
    return this.l10n.t('Create Exhibitor');
  }


  async model() {
    const filterOptions = [
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
    ];
    const event = this.modelFor('events.view');
    return {
      event,
      sessions: await event.query('sessions', {
        'page[size]' : 0,
        filter       : filterOptions
      }),
      exhibitor: await this.store.createRecord('exhibitor', {
        event,
        sessions: []
      })
    };
  }
}
