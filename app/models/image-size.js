import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  fullAspect       : attr('boolean'),
  thumbnailHeight  : attr('number'),
  thumbnailAspect  : attr('boolean'),
  iconHeight       : attr('number'),
  iconAspect       : attr('boolean'),
  type             : attr('string'),
  iconWidth        : attr('number'),
  iconQuality      : attr('number'),
  logoWidth        : attr('number'),
  fullWidth        : attr('number'),
  thumbnailWidth   : attr('number'),
  thumbnailQuality : attr('number'),
  fullHeight       : attr('number'),
  logoHeight       : attr('number'),
  fullQuality      : attr('number')
});
