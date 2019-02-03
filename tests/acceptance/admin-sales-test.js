import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { currentSession } from 'ember-simple-auth/test-support';
import { setupApplicationTest } from 'ember-qunit';
import { login } from 'open-event-frontend/tests/helpers/custom-helpers';

module('Acceptance | admin sales', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting admin-sales authenticated', async function(assert) {
    await login(assert);
    assert.equal(currentURL(), '/');
    await visit('/admin/sales');
    assert.equal(currentURL(), '/admin/sales');
  });

  test('visiting admin-sales by marketer authenticated', async function(assert) {
    await login(assert);
    assert.equal(currentURL(), '/');
    await visit('/admin/sales/marketer');
    assert.equal(currentURL(), '/admin/sales/marketer');
  });

  test('visiting admin-sales by location authenticated', async function(assert) {
    await login(assert);
    assert.equal(currentURL(), '/');
    await visit('/admin/sales/locations');
    assert.equal(currentURL(), '/admin/sales/locations');
  });

  test('visiting admin-sales by organizer authenticated', async function(assert) {
    await login(assert);
    assert.equal(currentURL(), '/');
    await visit('/admin/sales/organizers');
    assert.equal(currentURL(), '/admin/sales/organizers');
  });

  test('visiting admin-sales by discounted-events authenticated', async function(assert) {
    await login(assert);
    assert.equal(currentURL(), '/');
    await visit('/admin/sales/discounted-events');
    assert.equal(currentURL(), '/admin/sales/discounted-events');
  });


  test('visiting admin-sales unauthenticated', async function(assert) {
    assert.ok(currentSession().session.isAuthenticated !== true);
    await visit('/admin/sales');
    assert.equal(currentURL(), '/login');
  });

  test('visiting admin-sales by marketer unauthenticated', async function(assert) {
    assert.ok(currentSession().session.isAuthenticated !== true);
    await visit('/admin/sales/marketer');
    assert.equal(currentURL(), '/login');
  });

  test('visiting admin-sales by location unauthenticated', async function(assert) {
    assert.ok(currentSession().session.isAuthenticated !== true);
    await visit('/admin/sales/locations');
    assert.equal(currentURL(), '/login');
  });

  test('visiting admin-sales by organizer unauthenticated', async function(assert) {
    assert.ok(currentSession().session.isAuthenticated !== true);
    await visit('/admin/sales/organizers');
    assert.equal(currentURL(), '/login');
  });

  test('visiting admin-sales by discounted-events unauthenticated', async function(assert) {
    assert.ok(currentSession().session.isAuthenticated !== true);
    await visit('/admin/sales/discounted-events');
    assert.equal(currentURL(), '/login');
  });

});
