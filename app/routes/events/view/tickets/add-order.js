import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    return this.l10n.t('Add Order');
  }

  async model(params) {
    const eventDetails = this.modelFor('events.view');
    const searchField = 'name';
    let filterOptions = [];
    filterOptions = this.applySearchFilters(filterOptions, params, searchField);
    let queryString = {
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.per_page || 1
    };
    queryString = this.applySortFilters(queryString, params);
    return {
      tickets    : await this.asArray(eventDetails.query('tickets', queryString)),
      // query      : queryObject,
      store      : eventDetails,
      objectType : 'tickets',

      order: await this.store.createRecord('order', {
        event     : eventDetails,
        user      : this.get('authManager.currentUser'),
        tickets   : [],
        attendees : []
      }),

      attendees: []
    };
  }

  afterModel(model) {
    let { tickets } = model;
    tickets.forEach(ticket => {
      ticket.set('orderQuantity', 0);
    });
  }

  resetController(controller) {
    this._super(...arguments);
    const model = controller.get('model.order');
    if (!model.id) {
      model.unloadRecord();
    }
  }
}
