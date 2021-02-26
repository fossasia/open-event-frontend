import Component from '@ember/component';
import { computed } from '@ember/object';
import { groupBy, orderBy, sortBy } from 'lodash-es';
import FormMixin from 'open-event-frontend/mixins/form';
import { compulsoryProtocolValidUrlPattern, protocolLessValidUrlPattern, validPhoneNumber } from 'open-event-frontend/utils/validators';
import { countries } from 'open-event-frontend/utils/dictionary/demography';
import { languages } from 'open-event-frontend/utils/dictionary/languages';
import { genders } from 'open-event-frontend/utils/dictionary/genders';
import { sortCustomFormFields } from 'open-event-frontend/utils/sort';
import { SPEAKER_FORM_ORDER, SESSION_FORM_ORDER } from 'open-event-frontend/models/custom-form';

export default Component.extend(FormMixin, {

  newSpeakerSelected : false,
  newSessionSelected : false,

  getValidationRules() {
    const validationRules = {
      inline : true,
      delay  : false,
      on     : 'blur',

      fields: {
        title: {
          identifier : 'session_title_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a title')
            }
          ]
        },
        subtitle: {
          identifier : 'session_subtitle_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a subtitle')
            }
          ]
        },
        shortAbstract: {
          identifier : 'session_shortAbstract_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter short abstract')
            }
          ]
        },
        longAbstract: {
          identifier : 'session_longAbstract_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a long abstract')
            }
          ]
        },
        comments: {
          identifier : 'session_comments_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter comments')
            }
          ]
        },
        track: {
          identifier : 'session_track_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please select a track')
            }
          ]
        },
        sessionType: {
          identifier : 'session_sessionType_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please select a session type')
            }
          ]
        },
        level: {
          identifier : 'session_level_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a level')
            }
          ]
        },
        language: {
          identifier : 'session_language_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a language')
            }
          ]
        },
        slidesUrlRequired: {
          identifier : 'session_slidesUrl_required',
          rules      : [
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
        slidesUrl: {
          identifier : 'session_slidesUrl',
          optional   : true,
          rules      : [
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        },
        videoUrlRequired: {
          identifier : 'session_videoUrl_required',
          rules      : [
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
        videoUrl: {
          identifier : 'session_videoUrl',
          optional   : true,
          rules      : [
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        },
        audioUrlRequired: {
          identifier : 'session_audioUrl_required',
          rules      : [
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
        audioUrl: {
          identifier : 'session_audioUrl',
          optional   : true,
          rules      : [
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        },
        name: {
          identifier : 'speaker_name_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a name')
            }
          ]
        },
        emailRequired: {
          identifier : 'speaker_email_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter an email')
            },
            {
              type   : 'email',
              prompt : this.l10n.t('Please enter a valid email address')
            }
          ]
        },
        email: {
          identifier : 'speaker_email',
          optional   : true,
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter an email')
            },
            {
              type   : 'email',
              prompt : this.l10n.t('Please enter a valid email address')
            }
          ]
        },
        photoUrlRequired: {
          identifier : 'speaker_photoUrl_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please select an image')
            },
            {
              type   : 'regExp',
              value  : compulsoryProtocolValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        },
        photoUrl: {
          identifier : 'speaker_photoUrl',
          optional   : true,
          rules      : [
            {
              type   : 'regExp',
              value  : compulsoryProtocolValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        },
        organisation: {
          identifier : 'speaker_organisation_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter an organisation')
            }
          ]
        },
        position: {
          identifier : 'speaker_position_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a position')
            }
          ]
        },
        country: {
          identifier : 'speaker_country_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a country')
            }
          ]
        },
        city: {
          identifier : 'speaker_city_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a city')
            }
          ]
        },
        longBiography: {
          identifier : 'speaker_longBiography_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter long biography')
            }
          ]
        },
        shortBiography: {
          identifier : 'speaker_shortBiography_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter short biography')
            }
          ]
        },
        speakingExperience: {
          identifier : 'speaker_speakingExperience_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter speaking experience')
            }
          ]
        },
        sponsorshipRequired: {
          identifier : 'speaker_sponsorshipRequired_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter select sponsorship')
            }
          ]
        },
        gender: {
          identifier : 'speaker_gender_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please select a gender')
            }
          ]
        },
        heardFrom: {
          identifier : 'speaker_heardFrom_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter where you heard about the event')
            }
          ]
        },
        mobile: {
          identifier : 'speaker_mobile',
          optional   : true,
          rules      : [
            {
              type   : 'regExp',
              value  : validPhoneNumber,
              prompt : this.l10n.t('Please enter a valid mobile number.')
            }
          ]
        },
        mobileRequired: {
          identifier : 'speaker_mobile_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a mobile number')
            },
            {
              type   : 'regExp',
              value  : validPhoneNumber,
              prompt : this.l10n.t('Please enter a valid mobile number.')
            }
          ]
        },
        websiteRequired: {
          identifier : 'speaker_website_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter url of website')
            },
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        },
        website: {
          identifier : 'speaker_website',
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

    const addCustomFieldRules = form => {
      this.allFields[form].filter(field => field.isComplex && field.isRequired).forEach(field => {
        validationRules.fields[`${form}_${field.fieldIdentifier}_required`] = {
          rules: [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter {{field}}', { field: field.name })
            }
          ]
        };
      });
    };

    addCustomFieldRules('speaker');
    addCustomFieldRules('session');

    return validationRules;
  },

  countries: orderBy(countries, 'name'),

  languages: orderBy(languages, 'name'),

  genders: orderBy(genders, 'name'),

  allFields: computed('fields', function() {
    const grouped = groupBy(this.fields.toArray(), field => field.get('form'));

    grouped.speaker = sortBy(sortCustomFormFields(grouped.speaker, SPEAKER_FORM_ORDER), 'position');
    grouped.session = sortBy(sortCustomFormFields(grouped.session, SESSION_FORM_ORDER), 'position');

    return grouped;
  }),

  // Clicking on the add session button creates a blank record which increases the length of the speaker's list by 1.
  noSpeakerExists: computed('speakers', function() {
    return this.speakers.length === 1;
  }),

  isUserOwnerOrAdmin: computed('event.owner.email', 'authManager.currentUser', function() {
    return (this.authManager.currentUser.isAnAdmin || (this.event.owner.get('email') === this.authManager.currentUser.get('email')));
  }),

  isUserOrganiser: computed('event.organizers', 'authManager.currentUser', function() {
    const { currentUser } = this.authManager;
    return this.event.organizers.includes(currentUser);
  }),

  // Clicking on the add speaker button creates a blank record which increases the length of the session's list by 1.
  noSessionExists: computed('sessions', function() {
    return this.sessions.length === 1;
  }),

  shouldShowNewSessionDetails: computed('sessionDetails', 'newSessionSelected', function() {
    return this.newSessionSelected && !this.sessionDetails;
  }),

  actions: {
    submit() {
      this.onValid(() => {
        this.sendAction('save');
      });
    },

    toggleNewSessionSelected(value) {
      this.set('sessionDetails', null);
      this.set('newSessionSelected', !value);
    }
  },
  didInsertElement() {
    if (this.isSpeaker && this.data.speaker && this.data.speaker.length) {
      this.set('data.speaker', this.data.speaker.toArray()[0]);
    }

    if (this.isSession && this.data.session && this.data.session.length) {
      this.set('data.session', this.data.session.toArray()[0]);
    }
  }
});
