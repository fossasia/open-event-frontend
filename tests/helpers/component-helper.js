import { moduleForComponent } from 'ember-qunit';
import destroyApp from './destroy-app';
import startApp from './start-app';

export default function(path, name) {
  moduleForComponent(path, name, {
    integration: true,
    beforeEach() {
      this.application = startApp();
    },
    afterEach() {
      destroyApp(this.application);
    }
  });
}
