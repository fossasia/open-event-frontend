import EmberObject from '@ember/object';
import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('public/speaker-item', 'Integration | Component | public/speaker item');

const speaker = EmberObject.create({
  name           : 'Non featured Jane',
  email          : 'John@Doe.com',
  photoUrl       : 'https://image.ibb.co/ffRqs5/avatar.png',
  website        : 'https://johndoe.com',
  city           : 'Delhi',
  gender         : 'female',
  country        : 'India',
  organisation   : 'FOSSASIA',
  isFeatured     : false,
  shortBiography : 'iOS developer, deep learning enthusiast.',
  linkedin       : 'https://www.linkedin.com',
  longBiography  : 'iOs developer, deep learning enthusiast',
  mobile         : '888794238',
  github         : 'https://www.github.com',
  facebook       : 'https://www.facebook.com'
});

test('it renders', function(assert) {

  this.set('speaker', speaker);
  this.render(hbs `{{public/speaker-item speaker=speaker}}`);

  assert.ok(this.$().html().trim().includes('FOSSASIA'));
});
