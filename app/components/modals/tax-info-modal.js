import { computed } from '@ember/object';
import ModalBase from 'open-event-frontend/components/modals/modal-base';
import FormMixin from 'open-event-frontend/mixins/form';
import { countries } from 'open-event-frontend/utils/dictionary/demography';
import { orderBy } from 'lodash-es';

export default ModalBase.extend(FormMixin, {
  isSmall : false,
  options : {
    closable: false
  },

  autoScrollToErrors   : false,
  isTaxIncludedInPrice : 'include',

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        taxName: {
          identifier : 'tax_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give a name')
            }
          ]
        },
        taxRate: {
          identifier : 'tax_rate',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please tell us your tax rate (in %)')
            },
            {
              type   : 'number',
              prompt : this.l10n.t('Please give a valid tax rate')
            }
          ]
        },
        taxId: {
          identifier : 'tax_id',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give us your tax ID')
            }
          ]
        },
        taxInvoiceCompany: {
          identifier : 'tax_invoice_company',
          depends    : 'send_tax_invoices',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give us your company name')
            }
          ]
        },
        taxInvoiceAddress: {
          identifier : 'tax_invoice_address',
          depends    : 'send_tax_invoices',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give us your address')
            }
          ]
        },

        taxInvoiceCity: {
          identifier : 'tax_invoice_city',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give a city')
            }
          ]
        },

        taxInvoiceState: {
          identifier : 'tax_invoice_state',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give a state')
            }
          ]
        },

        taxInvoiceZipCode: {
          identifier : 'tax_invoice_zipcode',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please provide a zip code')
            }
          ]
        }
      }
    };
  },

  countries: computed(function() {
    return orderBy(countries, 'name');
  }),

  onVisible() {
    this.set('isTaxIncludedInPrice', this.get('tax.isTaxIncludedInPrice') ? 'include' : 'add');
  },

  actions: {
    updateTaxInfo() {
      this.$('.ui.form').form('validate form');
      if (this.$('.ui.form').form('is valid')) {
        this.set('tax.isTaxIncludedInPrice', this.isTaxIncludedInPrice === 'include');
        this.close();
        this.set('hasTaxInfo', true);
      }
    }
  }

});
