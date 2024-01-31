import ModalBase from 'open-event-frontend/components/modals/modal-base';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';

export default ModalBase.extend(FormMixin, {
  message  : '',
  mailSent : false,

  from: computed('authManager.currentUser', function() {
    return this.authManager.currentUser.fullName + ' <' + this.authManager.currentUser.email + '>';
  }),

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        identification: {
          identifier : 'message',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a message.')
            }
          ]
        }
      }
    };
  },

  actions: {
    contactOrganizer() {
      this.onValid(async() => {
        const payload = {};
        payload.email = this.message;
        try {
          if (this.group) {
            const response = await this.loader.post(`/groups/${this.event.id}/contact-organizer`, payload);
            if (!response?.success) {throw response}
            this.notify.success(this.l10n.t('Organizer contacted successfully.'), {
              id: 'contact_organizer_succ'
            });
          } else {
            const response = await this.loader.post(`/events/${this.event.id}/contact-organizer`, payload);
            if (!response?.success) {throw response}
            this.notify.success(this.l10n.t('Organizer contacted successfully.'), {
              id: 'contact_organizer_succ'
            });
          }
          this.set('mailSent', true);
        } catch (e) {
          console.error('Error while contacting organizer', e);
          this.notify.error(this.l10n.t('An unexpected error has occurred.'), {
            id: 'contact_organizer_err'
          });
        }
      });
    },
    close() {
      this.set('isOpen', false);
      this.set('message', '');
      this.set('mailSent', false);
    }
  }
});
