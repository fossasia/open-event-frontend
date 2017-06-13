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
        large_width: {
          identifier : 'large_width',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter width')
            }
          ]
        },
        large_height: {
          identifier : 'large_height',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter height')
            }
          ]
        },
        large_quality: {
          identifier : 'large_quality',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter quality')
            }
          ]
        },
        thumb_width: {
          identifier : 'thumb_width',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter width')
            }
          ]
        },
        thumb_height: {
          identifier : 'thumb_height',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter height')
            }
          ]
        },
        thumb_quality: {
          identifier : 'thumb_quality',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter quality')
            }
          ]
        },
        event_icon_width: {
          identifier : 'event_icon_width',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter width')
            }
          ]
        },
        event_icon_height: {
          identifier : 'event_icon_height',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter height')
            }
          ]
        },
        event_icon_quality: {
          identifier : 'event_icon_quality',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter quality')
            }
          ]
        },
        logo_width: {
          identifier : 'logo_width',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter width')
            }
          ]
        },
        logo_height: {
          identifier : 'logo_height',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter height')
            }
          ]
        },
        profile_thumb_size: {
          identifier : 'profile_thumb_size',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter size')
            }
          ]
        },
        profile_thumb_quality: {
          identifier : 'profile_thumb_quality',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter quality')
            }
          ]
        },
        profile_small_size: {
          identifier : 'profile_small_size',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter size')
            }
          ]
        },
        profile_small_quality: {
          identifier : 'profile_small_quality',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter quality')
            }
          ]
        },
        profile_icon_size: {
          identifier : 'profile_icon_size',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter size')
            }
          ]
        },
        profile_icon_quality: {
          identifier : 'profile_icon_quality',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter quality')
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
