import { moduleForComponent, test } from 'ember-qunit';
import destroyApp from './destroy-app';
import startApp from './start-app';
import Ember from 'ember';

const { Service } = Ember;

const i18nStub = Service.extend({
  t(val) {
    return val;
  }
});

export default function(path, name, testCase = null) {
  moduleForComponent(path, name, {
    integration: true,
    beforeEach() {
      this.register('service:l10n', i18nStub);
      this.inject.service('l10n', { as: 'i18n' });
      this.application = startApp();
    },
    afterEach() {
      destroyApp(this.application);
    }
  });

  if (testCase) {
    test('it renders', testCase);
  }
}
