import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  name              : attr('string'),
  size              : attr('string'),
  orientation       : attr('string'),
  is_rounded_corner : attr('boolean'),
  is_show_hole_slot : attr('boolean'),

  event: belongsTo('event')

});
