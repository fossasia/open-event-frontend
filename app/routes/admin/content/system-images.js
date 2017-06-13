import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('System Images');
  },
  model() {
    return ({
      topics: [
        {
          id   : 1,
          name : 'Automobiles'
        },
        {
          id   : 2,
          name : 'Yoga'
        },
        {
          id   : 3,
          name : 'charity'

        },
        {
          id   : 4,
          name : 'Travel'
        }
      ]
    });
  },
  afterModel(model, transition) {
    this._super(...arguments);
    if (transition.targetName === 'admin.content.system-images.index') {
      this.replaceWith('admin.content.system-images.list', model.topics[0].id);
    }
  }
});
