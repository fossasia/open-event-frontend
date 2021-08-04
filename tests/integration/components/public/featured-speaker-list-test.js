import { hbs } from 'ember-cli-htmlbars';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | public/featured speaker list', function(hooks) {
  setupIntegrationTest(hooks);

  const speakers = A(
    [
      EmberObject.create({
        name                 : 'Non featured Jane',
        email                : 'John@Doe.com',
        photoUrl             : 'https://image.ibb.co/ffRqs5/avatar.png',
        website              : 'https://johndoe.com',
        city                 : 'Delhi',
        gender               : 'female',
        country              : 'India',
        positionOrganisation : 'FOSSASIA',
        isFeatured           : true,
        shortBiography       : 'iOS developer, deep learning enthusiast.',
        linkedin             : 'https://www.linkedin.com',
        longBiography        : 'iOs developer, deep learning enthusiast',
        mobile               : '888794238',
        github               : 'https://www.github.com',
        facebook             : 'https://www.facebook.com'
      }),
      EmberObject.create({
        name                 : 'John Doe',
        email                : 'John@Doe.com',
        photoUrl             : 'https://image.ibb.co/ffRqs5/avatar.png',
        website              : 'https://johndoe.com',
        city                 : 'Mumbai',
        gender               : 'male',
        country              : 'India',
        positionOrganisation : 'FOSSASIA',
        isFeatured           : true,
        shortBiography       : 'iOS developer, deep learning enthusiast.',
        linkedin             : 'https://www.linkedin.com',
        longBiography        : 'kubernetes pro, deep learning enthusiast',
        mobile               : '888794238',
        github               : 'https://www.github.com',
        facebook             : 'https://www.facebook.com'
      })
    ]
  );

  test('it renders', async function(assert) {

    this.set('speakers', speakers);
    this.set('event', { id: 6 });
    await render(hbs `{{public/featured-speaker-list speakers=speakers event=event}}`);
    assert.ok(this.element.innerHTML.trim().includes('FOSSASIA'));
  });
});
