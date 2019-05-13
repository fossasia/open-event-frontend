import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { protocolLessValidUrlPattern } from 'open-event-frontend/utils/validators';

export default Component.extend(FormMixin, {

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        support: {
          identifier : 'support',
          optional   : 'true',
          rules      : [
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.get('l10n').t('Please enter a valid url')
            }
          ]
        },
        twitter: {
          identifier : 'twitter',
          optional   : true,
          rules      : [
            {
              type   : 'containsExactly[twitter.com]',
              prompt : this.get('l10n').t('Please enter a valid twitter url')
            },
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.get('l10n').t('Please enter a valid url')
            }
          ]
        },
        facebook: {
          identifier : 'facebook',
          optional   : true,
          rules      : [
            {
              type   : 'containsExactly[facebook.com]',
              prompt : this.get('l10n').t('Please enter a valid facebook url')
            },
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.get('l10n').t('Please enter a valid url')
            }
          ]
        },
        googlePlus: {
          identifier : 'google_plus',
          optional   : true,
          rules      : [
            {
              type   : 'containsExactly[plus.google.com]',
              prompt : this.get('l10n').t('Please enter a valid google plus url')
            },
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.get('l10n').t('Please enter a valid url')
            }
          ]
        },
        youtube: {
          identifier : 'youtube',
          optional   : true,
          rules      : [
            {
              type   : 'containsExactly[youtube.com]',
              prompt : this.get('l10n').t('Please enter a valid youtube url')
            },
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.get('l10n').t('Please enter a valid url')
            }
          ]
        },
        github: {
          identifier : 'github',
          optional   : true,
          rules      : [
            {
              type   : 'containsExactly[github.com]',
              prompt : this.get('l10n').t('Please enter a valid GitHub url')
            },
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.get('l10n').t('Please enter a valid url')
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
