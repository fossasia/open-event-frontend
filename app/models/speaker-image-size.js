import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import CustomPrimaryKeyMixin from 'open-event-frontend/mixins/custom-primary-key';

export default ModelBase.extend(CustomPrimaryKeyMixin, {
  thumbnailSizeQuality     : attr('number'),
  type                     : attr('string'),
  smallSizeWidthHeight     : attr('number'),
  smallSizeQuality         : attr('number'),
  iconSizeQuality          : attr('number'),
  iconSizeWidthHeight      : attr('number'),
  thumbnailSizeWidthHeight : attr('number')
});
