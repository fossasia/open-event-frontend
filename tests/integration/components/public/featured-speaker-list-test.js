import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { Object: EmberObject, A } = Ember;

moduleForComponent('public/featured-speaker-list', 'Integration | Component | public/featured speaker list');

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
  assert.ok(this.$().html().trim().includes('FOSSASIA'));
});
