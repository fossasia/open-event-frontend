import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class PaypalButton extends Component {
  @service
  router;

  async didInsertElement() {
    super.didInsertElement(...arguments);
    const paypal = await import('paypal-checkout');

    if (this.paymentFor === 'order') {
      const order = this.data;
      const createPayload = {
        'data': {
          'attributes': {
            'return-url' : `${window.location.origin}/orders/${order.identifier}/view`,
            'cancel-url' : `${window.location.origin}/orders/${order.identifier}/pending`
          },
          'type': 'paypal-payment'
        }
      };

      paypal.Button.render({
        commit : true,
        env    : this.settings.paypalMode === 'sandbox' ? this.settings.paypalMode : 'production',
        style  : {
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
          const config = {
            skipDataTransform: true
          };
          chargePayload = JSON.stringify(chargePayload);
          return this.loader.post(`orders/${order.identifier}/charge`, chargePayload, config)
            .then(charge => {
              if (charge.data.attributes.status) {
                this.notify.success(charge.data.attributes.message, {
                  id: 'paypal_button_success'
                });
                this.router.transitionTo('orders.view', order.identifier);
              } else {
                this.notify.error(charge.data.attributes.message, {
                  id: 'paypal_button_error'
                });
              }
            });
        }

      }, this.elementId);

    } else if (this.paymentFor === 'invoice') {
      const eventInvoice = this.data;
      const createPayload = {
        'data': {
          'attributes': {
            'return-url' : `${window.location.origin}/event-invoice/${eventInvoice.identifier}/paid`,
            'cancel-url' : `${window.location.origin}/event-invoice/${eventInvoice.identifier}/pending`
          },
          'type': 'paypal-payment'
        }
      };
      paypal.Button.render({
        env    : this.settings.paypalMode === 'sandbox' ? this.settings.paypalMode : 'production',
        commit : true,
        style  : {
          label : 'pay',
          size  : 'medium', // tiny, small, medium
          color : 'gold', // orange, blue, silver
          shape : 'pill'    // pill, rect
        },

        payment: () => {
          return this.loader.post(`event-invoices/${eventInvoice.identifier}/create-paypal-payment`, createPayload)
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
          const config = {
            skipDataTransform: true
          };
          chargePayload = JSON.stringify(chargePayload);
          return this.loader.post(`event-invoices/${eventInvoice.identifier}/charge`, chargePayload, config)
            .then(charge => {
              if (charge.status) {
                this.notify.success(charge.status, {
                  id: 'paypal_button_success_1'
                });
                this.router.transitionTo('event-invoice.paid', eventInvoice.identifier);
              } else {
                this.notify.error(charge.error, {
                  id: 'paypal_button_error_1'
                });

              }
            });
        }

      }, this.elementId);


    }
  }
}
