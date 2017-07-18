import Model from 'ember-data/model';
import ModelMixin from 'ember-data-has-many-query/mixins/model';
import { fixFilterQuery } from 'open-event-frontend/adapters/application';

export default Model.extend(ModelMixin, {
  query(propertyName, params) {
    params = fixFilterQuery(params);
    return this._super(propertyName, params);
  }
});
