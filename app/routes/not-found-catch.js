import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.i18n.t('Page Not Found');
  },
  templateName: 'not-found'
});
