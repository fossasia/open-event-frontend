import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  name                 : attr('string'),
  taxId                : attr('string'),
  rate                 : attr('number'),
  shouldSendInvoice    : attr('boolean'),
  country              : attr('string'),
  registeredCompany    : attr('string'),
  contactName          : attr('string'),
  email                : attr('string'),
  phone                : attr('string'),
  address              : attr('string'),
  city                 : attr('string'),
  state                : attr('string'),
  zip                  : attr('string'),
  invoiceFooter        : attr('string'),
  isInvoiceSent        : attr('boolean', { defaultValue: false }),
  isTaxIncludedInPrice : attr('boolean', { defaultValue: false }),

  event: belongsTo('event')
});
