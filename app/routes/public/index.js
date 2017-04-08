import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    const eventModel = this._super(...arguments);
    return eventModel;
  }
});
