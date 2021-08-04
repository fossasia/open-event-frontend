import { hbs } from 'ember-cli-htmlbars';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | public/speaker item', function(hooks) {
  setupIntegrationTest(hooks);

  const speaker = EmberObject.create({
    name                 : 'Non featured Jane',
    email                : 'John@Doe.com',
    photoUrl             : 'https://image.ibb.co/ffRqs5/avatar.png',
    website              : 'https://johndoe.com',
    city                 : 'Delhi',
    gender               : 'female',
    country              : 'India',
    positionOrganisation : 'FOSSASIA',
    isFeatured           : false,
    shortBiography       : 'iOS developer, deep learning enthusiast.',
    linkedin             : 'https://www.linkedin.com',
    longBiography        : 'iOs developer, deep learning enthusiast',
    mobile               : '888794238',
    github               : 'https://www.github.com',
    facebook             : 'https://www.facebook.com'
  });

  test('it renders', async function(assert) {

    this.set('speaker', speaker);
    await render(hbs `{{public/speaker-item speaker=speaker}}`);

    assert.ok(this.element.innerHTML.trim().includes('FOSSASIA'));
  });
});
