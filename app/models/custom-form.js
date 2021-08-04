import { tn } from 'open-event-frontend/utils/text';
import { computed, observer } from '@ember/object';
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';

export const SPEAKER_FORM_FIELDS = {
  name                : tn.t('Name'),
  email               : tn.t('Email'),
  position            : tn.t('Position'),
  organisation        : tn.t('Organisation'),
  address             : tn.t('Address'),
  city                : tn.t('City'),
  country             : tn.t('Country'),
  mobile              : tn.t('Mobile'),
  gender              : tn.t('Gender'),
  shortBiography      : tn.t('Short Biography'),
  longBiography       : tn.t('Long Biography'),
  speakingExperience  : tn.t('Speaking Experience'),
  photoUrl            : tn.t('Photo'),
  website             : tn.t('Website'),
  github              : tn.t('GitHub'),
  facebook            : tn.t('Facebook'),
  twitter             : tn.t('Twitter'),
  instagram           : tn.t('Instagram'),
  mastodon            : tn.t('Mastodon'),
  linkedin            : tn.t('Linkedin'),
  heardFrom           : tn.t('Heard From'),
  sponsorshipRequired : tn.t('Sponsorship Required')
};

export const SPEAKER_FORM_ORDER = Object.keys(SPEAKER_FORM_FIELDS);

export const SESSION_FORM_FIELDS = {
  title         : tn.t('Title'),
  subtitle      : tn.t('Subtitle'),
  track         : tn.t('Track'),
  sessionType   : tn.t('Session Type'),
  shortAbstract : tn.t('Short Abstract'),
  longAbstract  : tn.t('Long Abstract'),
  language      : tn.t('Language'),
  level         : tn.t('Level'),
  slidesUrl     : tn.t('Slides'),
  videoUrl      : tn.t('Video'),
  audioUrl      : tn.t('Audio'),
  website       : tn.t('Website'),
  github        : tn.t('GitHub'),
  facebook      : tn.t('Facebook'),
  twitter       : tn.t('Twitter'),
  instagram     : tn.t('Instagram'),
  linkedin      : tn.t('Linkedin'),
  gitlab        : tn.t('GitLab'),
  mastodon      : tn.t('Mastodon'),
  comments      : tn.t('Comments')
};

export const SESSION_FORM_ORDER = Object.keys(SESSION_FORM_FIELDS);

export default ModelBase.extend({

  fieldIdentifier : attr('string'),
  form            : attr('string'),
  type            : attr('string', { defaultValue: 'text' }),
  name            : attr('string'),
  isRequired      : attr('boolean', { defaultValue: false }),
  isPublic        : attr('boolean', { defaultValue: false }),
  isIncluded      : attr('boolean', { defaultValue: false }),
  isFixed         : attr('boolean', { defaultValue: false }),
  position        : attr('number'),
  isComplex       : attr('boolean', { defaultValue: false }),
  description     : attr('string', { defaultValue: 'text' }),


  event             : belongsTo('event'),
  customFormOptions : hasMany('customFormOptions'),

  session: SESSION_FORM_FIELDS,

  speaker: SPEAKER_FORM_FIELDS,

  attendee: {
    firstname            : tn.t('First Name'),
    lastname             : tn.t('Last Name'),
    email                : tn.t('Email'),
    address              : tn.t('Address (Street, Building, Number etc.)'),
    city                 : tn.t('City'),
    state                : tn.t('State'),
    country              : tn.t('Country'),
    jobTitle             : tn.t('Job Title'),
    phone                : tn.t('Phone'),
    taxBusinessInfo      : tn.t('Tax Business Info'),
    company              : tn.t('Organisation'),
    workPhone            : tn.t('Work Phone'),
    website              : tn.t('Website'),
    blog                 : tn.t('Blog'),
    twitter              : tn.t('Twitter'),
    facebook             : tn.t('Facebook'),
    github               : tn.t('GitHub'),
    instagram            : tn.t('Instagram'),
    linkedin             : tn.t('LinkedIn'),
    mastodon             : tn.t('Mastodon'),
    gender               : tn.t('Gender'),
    acceptReceiveEmails  : tn.t('Email consent'),
    acceptVideoRecording : tn.t('Photo & video & text consent'),
    acceptShareDetails   : tn.t('Partner contact consent'),
    ageGroup             : tn.t('Age Group')
  },

  ready() {
    if (!this.name) {
      this.name = this[this.form][this.fieldIdentifier];
    }
  },

  identifierPath: computed('isComplex', function() {
    return !this.isComplex ? this.fieldIdentifier : 'complexFieldValues.' + this.fieldIdentifier;
  }),

  isLongText: computed('type', function() {
    return this.type === 'text'
    && (['shortBiography', 'longBiography', 'longAbstract', 'shortAbstract', 'comments', 'speakingExperience'].includes(this.fieldIdentifier));
  }),

  isIncludedObserver: observer('isIncluded', function() {
    if (!this.isIncluded && this.isRequired) {
      this.set('isRequired', false);
    }
  }),

  isUrlField: computed('type', 'fieldIdentifier', function() {
    return this.type === 'text'
    && (['website', 'twitter', 'github', 'gitlab', 'mastodon', 'facebook', 'linkedin', 'slidesUrl', 'instagram', 'videoUrl', 'audioUrl'].includes(this.fieldIdentifier));
  }),

  isRequiredObserver: observer('isRequired', function() {
    if (!this.isIncluded && this.isRequired) {
      this.set('isIncluded', true);
    }
  })
});
