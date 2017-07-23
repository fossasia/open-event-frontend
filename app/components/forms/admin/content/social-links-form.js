import Ember from 'ember';
import FormMixin from 'open-event-frontend/mixins/form';

const { Component } = Ember;

export default Component.extend(FormMixin, {

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        twitter: {
          identifier : 'twitter',
          optional   : true,
          rules      : [
            {
              type   : 'containsExactly[twitter.com]',
              prompt : this.l10n.t('Please enter a valid twitter url')
            }
          ]
        },
        facebook: {
          identifier : 'facebook',
          optional   : true,
          rules      : [
            {
              type   : 'containsExactly[facebook.com]',
              prompt : this.l10n.t('Please enter a valid facebook url')
            }
          ]
        },
        googlePlus: {
          identifier : 'google_plus',
          optional   : true,
          rules      : [
            {
              type   : 'containsExactly[plus.google.com]',
              prompt : this.l10n.t('Please enter a valid google plus url')
            }
          ]
        },
        youtube: {
          identifier : 'youtube',
          optional   : true,
          rules      : [
            {
              type   : 'containsExactly[youtube.com]',
              prompt : this.l10n.t('Please enter a valid youtube url')
            }
          ]
        },
        github: {
          identifier : 'github',
          optional   : true,
          rules      : [
            {
              type   : 'containsExactly[github.com]',
              prompt : this.l10n.t('Please enter a valid github url')
            }
          ]
        }
      }
    };
  },
  actions: {
    submit() {
      this.onValid(() => {
        this.sendAction('save');
      });
    }
  }

});
