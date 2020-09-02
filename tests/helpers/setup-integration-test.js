import RoutingServiceStub from 'open-event-frontend/tests/helpers/stubs/services/-routing';
import L10n from 'ember-l10n/services/l10n';
import { setupRenderingTest } from 'ember-qunit';
import { set } from '@ember/object';

export function setupIntegrationTest(hooks) {

  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    this.owner.lookup('router:main').setupRouter();
    this.owner.register('service:routing', RoutingServiceStub);
    set(this, 'routing', this.owner.lookup('service:routing'));
    this.owner.register('service:l10n', L10n);
    set(this, 'l10n', this.owner.lookup('service:l10n'));
    set(this, 'router', this.owner.lookup('service:router'));
  });

}
