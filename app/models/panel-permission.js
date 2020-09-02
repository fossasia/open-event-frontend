import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  panelName : attr('string'),
  canAccess : attr('boolean')
});
