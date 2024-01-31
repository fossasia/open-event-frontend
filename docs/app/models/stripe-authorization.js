import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  stripeAuthCode       : attr('string'),
  stripePublishableKey : attr('string'),

  event: belongsTo('event')
});
