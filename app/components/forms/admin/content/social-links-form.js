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
        support: {
          identifier : 'support',
          optional   : true,
          rules      : [
            {
              type   : 'url',
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        },
        twitter: {
          identifier : 'twitter',
          optional   : true,
          rules      : [
            {
              type   : 'url',
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        },
        facebook: {
          identifier : 'facebook',
          optional   : true,
          rules      : [
            {
              type   : 'url',
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        },
        googlePlus: {
          identifier : 'google_plus',
          optional   : true,
          rules      : [
            {
              type   : 'url',
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        },
        youtube: {
          identifier : 'youtube',
          optional   : true,
          rules      : [
            {
              type   : 'url',
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        },
        github: {
          identifier : 'github',
          optional   : true,
          rules      : [
            {
              type   : 'url',
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        }
      }
    };
  },
  actions: {
    submit() {
      this.onValid(() => {
      });
    }
  }

});
