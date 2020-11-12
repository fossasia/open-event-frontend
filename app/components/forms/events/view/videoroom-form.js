import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { protocolLessValidUrlPattern } from 'open-event-frontend/utils/validators';


export default Component.extend(FormMixin, {

  getValidationRules() {
    window.$.fn.form.settings.rules.checkVideoRoomsLength = () => {
      return this.data.stream.rooms.length > 0;
    };
    const validationRules = {
      inline : true,
      delay  : false,
      on     : 'blur',

      fields: {
        name: {
          rules: [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a name')
            }
          ]
        },
        url: {
          rules: [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a url')
            },
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        },
        rooms: {
          rules: [
            {
              type   : 'checkVideoRoomsLength',
              prompt : this.l10n.t('Please select a room')
            }
          ]
        }
      }
    };

    return validationRules;
  },

  actions: {
    submit() {
      this.onValid(async() => {
        try {
          this.loading = true;
          await this.data.stream.save();
          this.notify.success(this.l10n.t('Your stream has been saved'),
            {
              id: 'stream_save'
            });
          this.router.transitionTo('events.view.videoroom', this.data.event.id);
        } catch (e) {
          console.error('Error while saving session', e);
          this.notify.error(this.l10n.t('Oops something went wrong. Please try again'),
            {
              id: 'stream_save_error'
            });
        } finally {
          this.loading = false;
        }
      });
    }
  }
});
