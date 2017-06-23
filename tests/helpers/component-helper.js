import { moduleForComponent, test } from 'ember-qunit';
import destroyApp from './destroy-app';
import startApp from './start-app';
import Ember from 'ember';
import l10nTestHelper from 'ember-l10n/test-helpers';
import fragmentTransformInitializer from 'open-event-frontend/initializers/model-fragments';
import L10n from 'ember-l10n/services/l10n';
const { run, getOwner } = Ember;

export default function(path, name, testCase = null) {
  moduleForComponent(path, name, {
    integration: true,

    beforeEach() {
      this.register('service:l10n', L10n);
      this.inject.service('l10n', { as: 'l10n' });
      this.application = startApp();
      l10nTestHelper(this);
      run(() => fragmentTransformInitializer.initialize(getOwner(this)));
    },

    afterEach() {
      destroyApp(this.application);
    }
  });

  if (testCase) {
    test('it renders', testCase);
  }
}
