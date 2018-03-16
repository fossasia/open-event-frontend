import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    updateSocialLink(type, socialLink) {
      // if user is providing the complete url
      if (!socialLink.match(/\.com\//gi)) {
        socialLink = `https://www.${type}.com/${socialLink}`;
      }

      let payload = {
        'data': {
          type,
          socialLink
        }
      };
      this.get('loader')
        .post('/user/sociallinks/update', payload)
        .then(() => {
          this.get('notify').success(this.l10n.t(`${type} handle updated successfully`));
        })
        .catch(error => {
          if (error.error) {
            this.get('notify').error(this.l10n.t(error.error));
          } else {
            this.get('notify').error(this.l10n.t(`Unexpected error. ${type} handle did not change.`));
          }
        })
        .finally(() => {
          let emptyIt = {};
          emptyIt[type] = '';
          this.setProperties(emptyIt);
        });
    }
  }
});
