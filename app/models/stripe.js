import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  stripeSecretKey      : attr('string'),
  stripeRefreshToken   : attr('string'),
  stripePublishableKey : attr('string'),
  stripeUserId         : attr('string'),
  stripeEmail          : attr('string'),

  event: belongsTo('event'),

  linked: false
});
