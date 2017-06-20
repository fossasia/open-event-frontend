import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Page Not Found');
  },
  templateName: 'not-found'
});
