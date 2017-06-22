import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Pages');
  },

  model() {
    return [
      {
        menu        : 'footer',
        name        : 'Privacy Policy',
        title       : 'Privacy Policy',
        path        : '/privacy-policy',
        description : '<h1>Privacy Policy</h1><p>Blah. Blah. Blah</p>',
        position    : 1,
        language    : 'en'
      }, {
        menu        : 'event',
        name        : 'Locations',
        title       : 'Privacy Policy',
        path        : '/loc',
        description : '<h1>Privacy Policy</h1><p>Blah. Blah. Blah</p>',
        position    : 1,
        language    : 'en'
      }, {
        menu        : 'event',
        name        : 'Maps',
        title       : 'Privacy Policy',
        path        : '/map',
        description : '<h1>Privacy Policy</h1><p>Blah. Blah. Blah</p>',
        position    : 1,
        language    : 'en'
      }
    ];
  }
});
