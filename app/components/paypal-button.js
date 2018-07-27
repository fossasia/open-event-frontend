import paypal from 'npm:paypal-checkout';
import Component from '@ember/component';

export default Component.extend({

  async didInsertElement() {
    this._super(...arguments);
    let order = this.get('data');
    let loader = this.get('loader');
    let createPayload = {
      'data': {
        'attributes': {
          'return-url' : `http://localhost:4200/orders/${order.identifier}/placed`,
          'cancel-url' : `http://localhost:4200/orders/${order.identifier}/placed`
        },
        'type': 'paypal-payment'
      }
    };

    paypal.Button.render({
      env: 'sandbox',

      commit: true,

      style: {
        label : 'pay',
        size  : 'medium', // tiny, small, medium
        color : 'gold', // orange, blue, silver
        shape : 'pill'    // pill, rect
      },

      payment() {
        return loader.post(`orders/${order.identifier}/create-paypal-payment`, createPayload)
          .then(res => {
            return res.payment_id;
          });
      },

      onAuthorize() {
        // this callback will be for authorizing the payments
      }

    }, this.elementId);

  }
});
