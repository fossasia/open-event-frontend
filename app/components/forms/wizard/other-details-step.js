import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';
import { merge, orderBy, find } from 'lodash-es';
import { licenses } from 'open-event-frontend/utils/dictionary/licenses';
import { timezones } from 'open-event-frontend/utils/dictionary/date-time';
import FormMixin from 'open-event-frontend/mixins/form';
import { inject as service } from '@ember/service';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { protocolLessValidUrlPattern } from 'open-event-frontend/utils/validators';
import $ from 'jquery';

export default Component.extend(FormMixin, EventWizardMixin, {

  currentTimezone: moment.tz.guess(),
  timezones,

  torii: service(),

  deletedTickets: [],

  licenses: computed(function() {
    return orderBy(licenses, 'name');
  }),


  socialLinks: computed('data.event.socialLinks.@each.isDeleted', function() {
    return this.data.event.socialLinks.filterBy('isDeleted', false);
  }),

  ticketsPresent: computed('data.event.tickets.@each', function() {
    return this.data.event.tickets.length > 0;
  }),

  isUserUnverified: computed('authManager.currentUser.isVerified', function() {
    return !this.authManager.currentUser.isVerified;
  }),
  /**
   * returns the validation rules for the social links.
   */
  socialLinksValidationRules: computed('socialLinks', function() {
    let validationRules = {};
    for (let i = 0; i < this.socialLinks.length; i++) {
      validationRules = merge(validationRules, {
        [this.socialLinks.get(i).identifier]: {
          identifier : this.socialLinks.get(i).identifier,
          optional   : true,
          rules      : [
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        }
      });
    }

    return validationRules;
  }),


  showDraftButton: computed('data.event.state', function() {
    return this.data.event.state !== 'published';
  }),

  hasCodeOfConduct: computed('data.event.codeOfConduct', function() {
    return !!this.data.event.codeOfConduct;
  }),

  didInsertElement() {
    if (!this.isCreate && this.data.event.copyright && !this.data.event.copyright.content) {
      this.set('data.event.copyright', this.store.createRecord('event-copyright'));
    }
  },

  // TODO: Removing the Event Time Validations due to the weird and buggy behaviour. Will be restored once a perfect solution is found. Please check issue: https://github.com/fossasia/open-event-frontend/issues/3667
  getValidationRules() {
    $.fn.form.settings.rules.checkMaxMinPrice = () => {
      return $('.ui.form').form('get value', 'min_price') <= $('.ui.form').form('get value', 'max_price');
    };
    $.fn.form.settings.rules.checkMaxMinOrder = () => {
      return $('.ui.form').form('get value', 'ticket_min_order') <= $('.ui.form').form('get value', 'ticket_max_order');
    };

    const validationRules = {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        timezone: {
          identifier : 'timezone',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Choose a timezone for your event')
            }
          ]
        },
        startTime: {
          identifier : 'start_time',
          depends    : 'start_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give a start time')
            }
          ]
        },
        endTime: {
          identifier : 'end_time',
          depends    : 'end_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give an end time')
            }
          ]
        },
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
    // Merging the predetermined rules with the rules for social links.
    validationRules.fields = merge(validationRules.fields, this.socialLinksValidationRules);
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
    saveDraft() {
      this.onValid(() => {
        this.set('data.event.state', 'draft');
        this.sendAction('save');
      });
    },
    move(direction) {
      this.onValid(() => {
        this.sendAction('move', direction);
      });
    },

    onChange() {
      this.onValid(() => {});
    },

    openConfirmModal() {
      this.set('isPublishUnpublishModalOpen', true);
    },

    togglePublishState() {
      this.set('isPublishUnpublishModalOpen', false);
      const { state } = this.data.event;
      this.set('isLoading', true);
      this.set('data.event.state', state === 'draft' ? 'published' : 'draft');
      this.data.event.save()
        .then(() => {
          if (state === 'draft') {
            this.sendAction('save', this.data);
            this.notify.success(this.l10n.t('Your event has been published successfully.'),
              {
                id: 'event_publish'
              });
          } else {
            this.sendAction('save', this.data);
            this.notify.success(this.l10n.t('Your event has been unpublished.'),
              {
                id: 'event_unpublish'
              });
          }
        })
        .catch(e => {
          console.error('Error while publishing/unpublishing event', e);
          this.set('data.event.state', state);
          this.notify.error(this.l10n.t('An unexpected error has occurred.'),
            {
              id: 'event_publish_error'
            });
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
