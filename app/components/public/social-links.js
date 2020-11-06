import { A } from '@ember/array';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['ui', 'basic', 'segment', 'm-0', 'pt-0'],

  socialLinks: A(),

  twitterLink: computed('socialLinks.[]', function() {
    return this.socialLinks.findBy('isTwitter', true);
  })
});
