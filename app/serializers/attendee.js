import ApplicationSerializer from 'open-event-frontend/serializers/application';
import CustomPrimaryKeyMixin from 'open-event-frontend/mixins/custom-primary-key';

export default ApplicationSerializer.extend(CustomPrimaryKeyMixin, {

  serialize(snapshot) {
    const json = this._super(...arguments);
    if (json.data.relationships.order) {
      json.data.relationships.order.data.id = snapshot._belongsToRelationships.order.__attributes.originalId;
    }
    return json;
  }
});
