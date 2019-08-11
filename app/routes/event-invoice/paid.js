import Route from '@ember/routing/route';

export default class extends Route {

  titleToken(model) {
    let invoice_identifier = model.get('identifier');
    return this.l10n.t(`Paid Event Invoice -${invoice_identifier}`);
  }

  model(params) {
    return this.store.findRecord('event-invoice', params.invoice_identifier, {
      include : 'event,user',
      reload  : true
    });
  }

  afterModel(model) {
    if (model.get('status') === 'due') {
      this.transitionTo('event-invoice.review', model.get('identifier'));
    } else if (model.get('status') === 'paid') {
      this.transitionTo('event-invoice.paid', model.get('identifier'));
    }
  }
}
