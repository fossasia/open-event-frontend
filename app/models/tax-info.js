import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  name              : attr('string'),
  taxId             : attr('string'),
  rate              : attr('number'),
  sendInvoice       : attr('boolean'),
  country           : attr('string'),
  registeredCompany : attr('string'),
  address           : attr('string'),
  city              : attr('string'),
  state             : attr('string'),
  zipcode           : attr('string'),
  invoiceFooter     : attr('string'),
  includeTaxInPrice : attr('boolean', { defaultValue: false }),

  event: belongsTo('event')
});
