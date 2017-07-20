import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';
import { computedSegmentedLink } from 'open-event-frontend/utils/computed-helpers';

export default ModelBase.extend({
  name        : attr('string'),
  level       : attr('number'),
  type        : attr('string'),
  url         : attr('string'),
  description : attr('string'),
  logoUrl     : attr('string'),

  event: belongsTo('event'),

  segmentedLink: computedSegmentedLink.bind(this)('url')
});
