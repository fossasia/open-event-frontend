import { find } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | public/featured speaker list', function(hooks) {
  setupRenderingTest(hooks);

  const speakers = A(
    [
      EmberObject.create({
        name           : 'Non featured Jane',
        email          : 'John@Doe.com',
        photoUrl       : 'https://image.ibb.co/ffRqs5/avatar.png',
        website        : 'https://johndoe.com',
        city           : 'Delhi',
        gender         : 'female',
        country        : 'India',
        organisation   : 'FOSSASIA',
        isFeatured     : true,
        shortBiography : 'iOS developer, deep learning enthusiast.',
        linkedin       : 'https://www.linkedin.com',
        longBiography  : 'iOs developer, deep learning enthusiast',
        mobile         : '888794238',
        github         : 'https://www.github.com',
        facebook       : 'https://www.facebook.com'
      }),
      EmberObject.create({
        name           : 'John Doe',
        email          : 'John@Doe.com',
        photoUrl       : 'https://image.ibb.co/ffRqs5/avatar.png',
        website        : 'https://johndoe.com',
        city           : 'Mumbai',
        gender         : 'male',
        country        : 'India',
        organisation   : 'FOSSASIA',
        isFeatured     : true,
        shortBiography : 'iOS developer, deep learning enthusiast.',
        linkedin       : 'https://www.linkedin.com',
        longBiography  : 'kubernetes pro, deep learning enthusiast',
        mobile         : '888794238',
        github         : 'https://www.github.com',
        facebook       : 'https://www.facebook.com'
      })
    ]
  );

  test('it renders', function(assert) {

    this.set('speakers', speakers);
    this.render(hbs `{{public/featured-speaker-list speakers=speakers}}`);
    assert.ok(find('*').innerHTML.trim().includes('FOSSASIA'));
  });
});
