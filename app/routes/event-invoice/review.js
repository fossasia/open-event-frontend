import Route from '@ember/routing/route';

export default class extends Route {
  titleToken(model) {
    return this.l10n.tVar(`Review Event Invoice - ${model.get('identifier')}`);
  }

  async model(params) {
    const model = await this.store.findRecord('event-invoice', params.invoice_identifier, {
      include : 'event,user',
      reload  : true
    });
    await model.reload();
    return model;
  }

  afterModel(model) {
    if (model.get('status') === 'due') {
      this.transitionTo('event-invoice.review', model.get('identifier'));
    } else if (model.get('status') === 'paid') {
      this.transitionTo('event-invoice.paid', model.get('identifier'));
    }
  }
}
