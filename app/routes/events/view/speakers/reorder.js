import Route from '@ember/routing/route';

export default class SpeakersReorderRoute extends Route {
  titleToken() {
    return this.l10n.t('Reorder Speakers');
  }

  async model() {
    return this.modelFor('events.view').query('speakers', {
      sort         : 'order',
      'page[size]' : 0,
      cache        : true,
      public       : true,
      filter       : [
        {
          name : 'sessions',
          op   : 'any',
          val  : {
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
        }
      ]
    });
  }
}
