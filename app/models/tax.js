import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name                 : attr('string'),
  taxId                : attr('string'),
  rate                 : attr('number'),
  shouldSendInvoice    : attr('boolean'),
  country              : attr('string'),
  registeredCompany    : attr('string'),
  address              : attr('string'),
  city                 : attr('string'),
  state                : attr('string'),
  zip                  : attr('string'),
  invoiceFooter        : attr('string'),
  isTaxIncludedInPrice : attr('boolean', { defaultValue: false }),

  event: belongsTo('event')
});
