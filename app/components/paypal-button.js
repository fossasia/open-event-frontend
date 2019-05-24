import paypal from 'paypal-checkout';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({

  router: service(),

  async didInsertElement() {
    this._super(...arguments);
    let order = this.data;
    let createPayload = {
      'data': {
        'attributes': {
          'return-url' : `${window.location.origin}/orders/${order.identifier}/view`,
          'cancel-url' : `${window.location.origin}/orders/${order.identifier}/pending`
        },
        'type': 'paypal-payment'
      }
    };

    paypal.Button.render({
      commit: true,

      style: {
        label : 'pay',
        size  : 'medium', // tiny, small, medium
        color : 'gold', // orange, blue, silver
        shape : 'pill'    // pill, rect
      },

      payment: () => {
        return this.loader.post(`orders/${order.identifier}/create-paypal-payment`, createPayload)
          .then(res => {
            return res.payment_id;
          });
      },

      onAuthorize: data => {
        // this callback will be for authorizing the payments
        let chargePayload = {
          'data': {
            'attributes': {
              'stripe'            : null,
              'paypal_payer_id'   : data.payerID,
              'paypal_payment_id' : data.paymentID
            },
            'type': 'charge'
          }
        };
        let config = {
          skipDataTransform: true
        };
        chargePayload = JSON.stringify(chargePayload);
        return this.loader.post(`orders/${order.identifier}/charge`, chargePayload, config)
          .then(charge => {
            if (charge.data.attributes.status) {
              this.notify.success(charge.data.attributes.message);
              this.router.transitionTo('orders.view', order.identifier);
            } else {
              this.notify.error(charge.data.attributes.message);
            }
          });
      }

    }, this.elementId);

  }
});
