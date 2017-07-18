import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  stripeSecretKey      : attr('string'),
  stripeRefreshToken   : attr('string'),
  stripePublishableKey : attr('string'),
  stripeUserId         : attr('string'),
  stripeEmail          : attr('string'),

  event: belongsTo('event'),

  linked: false
});
