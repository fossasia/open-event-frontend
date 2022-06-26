import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';
import { orderBy, find } from 'lodash-es';
import { licenses } from 'open-event-frontend/utils/dictionary/licenses';
import { timezones } from 'open-event-frontend/utils/dictionary/date-time';
import FormMixin from 'open-event-frontend/mixins/form';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { protocolLessValidUrlPattern } from 'open-event-frontend/utils/validators';

export default Component.extend(FormMixin, EventWizardMixin, {

  currentTimezone: moment.tz.guess(),
  timezones,

  deletedTickets: [],

  licenses: computed(() => orderBy(licenses, 'name')),

  socialLinks: computed('data.event.socialLinks.@each.isDeleted', () => this.data.event.socialLinks.filterBy('isDeleted', false)),

  socialMediaLinks: computed('socialLinks', () => this.socialLinks.filterBy('isSocial', true) ),

  customLinks: computed('socialLinks', () => this.socialLinks.filterBy('isCustom', true) ),

  isUserUnverified: computed('authManager.currentUser.isVerified', () => !this.authManager?.currentUser?.isVerified ),

  showDraftButton: computed('data.event.state', () => this.data.event.state !== 'published' ),

  hasCodeOfConduct: computed('data.event.codeOfConduct', () => !!this.data.event.codeOfConduct ),

  didInsertElement() {
    if (!this.isCreate && this.data.event.copyright && !this.data.event.copyright.content) {
      this.set('data.event.copyright', this.store.createRecord('event-copyright'));
    }
  },

  getValidationRules() {
    const validationRules = {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        externalEventIdentifier: {
          identifier : 'external_event_url',
          optional   : true,
          rules      : [
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        }
      }
    };
    return validationRules;
  },

  actions: {
    async updateCopyright(name) {
      const { event } = this.data;
      const copyright = await this.getOrCreate(event, 'copyright', 'event-copyright');
      const license = find(licenses, { name });
      copyright.setProperties({
        licence    : name,
        logoUrl    : license.logoUrl,
        licenceUrl : license.link
      });
    },
    clearLicense() {
      this.setProperties({
        'data.event.copyright.licence': null
      });
    },
    onChange() {
      this.onValid(() => {});
    }
  }
});
