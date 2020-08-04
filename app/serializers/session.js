import ApplicationSerializer from 'open-event-frontend/serializers/application';
import CustomPrimaryKeyMixin from 'open-event-frontend/mixins/custom-primary-key';

export default ApplicationSerializer.extend(CustomPrimaryKeyMixin, {

  serialize() {
    const json = this._super(...arguments);

    const { attributes } = json.data;
    if (Object.keys(attributes['complex-field-values']).length === 0) {
      // If object is empty, remove it so that validations on server aren't triggered
      delete attributes['complex-field-values'];
    }

    return json;
  }

});
