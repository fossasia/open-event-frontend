import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        largeWidth: {
          identifier : 'large_width',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter width')
            }
          ]
        },
        largeHeight: {
          identifier : 'large_height',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter height')
            }
          ]
        },
        largeQuality: {
          identifier : 'large_quality',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter quality')
            }
          ]
        },
        thumbWidth: {
          identifier : 'thumb_width',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter width')
            }
          ]
        },
        thumbHeight: {
          identifier : 'thumb_height',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter height')
            }
          ]
        },
        thumbQuality: {
          identifier : 'thumb_quality',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter quality')
            }
          ]
        },
        eventIconWidth: {
          identifier : 'event_icon_width',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter width')
            }
          ]
        },
        eventIconHeight: {
          identifier : 'event_icon_height',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter height')
            }
          ]
        },
        eventIconQuality: {
          identifier : 'event_icon_quality',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter quality')
            }
          ]
        },
        logoWidth: {
          identifier : 'logo_width',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter width')
            }
          ]
        },
        logoHeight: {
          identifier : 'logo_height',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter height')
            }
          ]
        },
        profileThumbSize: {
          identifier : 'profile_thumb_size',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter size')
            }
          ]
        },
        profileThumbQuality: {
          identifier : 'profile_thumb_quality',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter quality')
            }
          ]
        },
        profileSmallSize: {
          identifier : 'profile_small_size',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter size')
            }
          ]
        },
        profileSmallQuality: {
          identifier : 'profile_small_quality',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter quality')
            }
          ]
        },
        profileIconSize: {
          identifier : 'profile_icon_size',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter size')
            }
          ]
        },
        profileIconQuality: {
          identifier : 'profile_icon_quality',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter quality')
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
