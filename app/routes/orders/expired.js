import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class ExpiredRoute extends Route {
  titleToken(model) {
    const order = model.get('identifier');
    return this.l10n.t('Expired Order') + ' - ' + order;
  }

  model(params) {
    return this.store.findRecord('order', params.order_id, {
      include : 'event',
      reload  : true
    });
  }

  afterModel(model) {
    if (model.get('status') === 'initializing') {
      this.transitionTo('orders.new', model.get('identifier'));
    } else if (model.get('status') === 'completed' || model.get('status') === 'placed') {
      this.transitionTo('orders.view', model.get('identifier'));
    } else if (model.get('status') === 'pending') {
      this.transitionTo('orders.pending', model.get('identifier'));
    }
  }
}
