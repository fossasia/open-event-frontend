import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  stripeSecretKey      : attr('string'),
  stripeRefreshToken   : attr('string'),
  stripePublishableKey : attr('string'),
  stripeUserId         : attr('string'),
  stripeEmail          : attr('string'),

  event: belongsTo('event'),

  linked: false
});
