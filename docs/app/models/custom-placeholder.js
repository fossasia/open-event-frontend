import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  origin            : attr('string'),
  thumbnailImageUrl : attr('string'),
  name              : attr('string'),
  copyright         : attr('string'),
  originalImageUrl  : attr('string'),
  iconImageUrl      : attr('string'),
  largeImageUrl     : attr('string'),

  eventSubTopic: belongsTo('event-sub-topic')
});
