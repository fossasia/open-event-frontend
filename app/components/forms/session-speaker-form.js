import Component from '@ember/component';
import { computed } from '@ember/object';
import { groupBy } from 'lodash';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {

  newSpeakerSelected : false,
  newSessionSelected : false,

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',

      fields: {
        title: {
          identifier : 'session_title_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter a title')
            }
          ]
        },
        subtitle: {
          identifier : 'session_subtitle_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter a subtitle')
            }
          ]
        },
        shortAbstract: {
          identifier : 'session_shortAbstract_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter short abstract')
            }
          ]
        },
        longAbstract: {
          identifier : 'session_longAbstract_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter a long abstract')
            }
          ]
        },
        comments: {
          identifier : 'session_comments_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter comments')
            }
          ]
        },
        track: {
          identifier : 'session_track_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please select a track')
            }
          ]
        },
        sessionType: {
          identifier : 'session_sessionType_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please select a session type')
            }
          ]
        },
        level: {
          identifier : 'session_level_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter a level')
            }
          ]
        },
        language: {
          identifier : 'session_language_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter a language')
            }
          ]
        },
        slidesUrl: {
          identifier : 'session_slidesUrl_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter a url')
            }
          ]
        },
        videoUrl: {
          identifier : 'session_videoUrl_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter a url')
            }
          ]
        },
        audioUrl: {
          identifier : 'session_audioUrl_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter a url')
            }
          ]
        },
        name: {
          identifier : 'speaker_name_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter a name')
            }
          ]
        },
        email: {
          identifier : 'speaker_email_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter an email')
            }
          ]
        },
        photoUrl: {
          identifier : 'speaker_photoUrl_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please select an image')
            }
          ]
        },
        organisation: {
          identifier : 'speaker_organisation_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter an organisation')
            }
          ]
        },
        position: {
          identifier : 'speaker_position_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter a position')
            }
          ]
        },
        country: {
          identifier : 'speaker_country_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter a country')
            }
          ]
        },
        city: {
          identifier : 'speaker_city_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter a city')
            }
          ]
        },
        longBiography: {
          identifier : 'speaker_longBiography_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter long biography')
            }
          ]
        },
        shortBiography: {
          identifier : 'speaker_shortBiography_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter short biography')
            }
          ]
        },
        speakingExperience: {
          identifier : 'speaker_speakingExperience_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter speaking experience')
            }
          ]
        },
        sponsorshipRequired: {
          identifier : 'speaker_sponsorshipRequired_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter select sponsorship')
            }
          ]
        },
        gender: {
          identifier : 'speaker_gender_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please select a gender')
            }
          ]
        },
        heardFrom: {
          identifier : 'speaker_heardFrom_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter where you heard about the event')
            }
          ]
        },
        mobile: {
          identifier : 'speaker_mobile_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter a mobile number')
            }
          ]
        },
        website: {
          identifier : 'speaker_website_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter url of website')
            }
          ]
        },
        facebook: {
          identifier : 'speaker_facebook_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter facebook link')
            }
          ]
        },
        twitter: {
          identifier : 'speaker_twitter_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter twitter link')
            }
          ]
        },
        github: {
          identifier : 'speaker_github_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter github link')
            }
          ]
        },
        linkedin: {
          identifier : 'speaker_linkedin_required',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter linkedin link')
            }
          ]
        }
      }
    };
  },

  allFields: computed('fields', function() {
    return groupBy(this.get('fields').toArray(), field => field.get('form'));
  }),

  // Clicking on the add session button creates a blank record which increases the length of the speaker's list by 1.
  noSpeakerExists: computed('speakers', function() {
    return (this.get('speakers').length === 1);
  }),

  // Clicking on the add speaker button creates a blank record which increases the length of the session's list by 1.
  noSessionExists: computed('sessions', function() {
    return (this.get('sessions').length === 1);
  }),

  shouldShowNewSpeakerDetails: computed('speakerDetails', 'newSpeakerSelected', function() {
    return this.get('newSpeakerSelected') && !this.get('speakerDetails');
  }),

  shouldShowNewSessionDetails: computed('sessionDetails', 'newSessionSelected', function() {
    return this.get('newSessionSelected') && !this.get('sessionDetails');
  }),

  actions: {
    submit() {
      this.onValid(() => {
        this.sendAction('save');
      });
    },

    toggleNewSpeakerSelected(value) {
      this.set('speakerDetails', false);
      this.set('newSpeakerSelected', value);
    },

    toggleNewSessionSelected(value) {
      this.set('sessionDetails', false);
      this.set('newSessionSelected', value);
    }
  },
  didInsertElement() {
    if (this.get('isSpeaker') && this.get('data.speaker') && this.get('data.speaker').length) {
      this.set('data.speaker', this.get('data.speaker').toArray()[0]);
    }

    if (this.get('isSession') && this.get('data.session') && this.get('data.session').length) {
      this.set('data.session', this.get('data.session').toArray()[0]);
    }
  }
});
