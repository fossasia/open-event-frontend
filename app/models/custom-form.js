import { computed, observer } from '@ember/object';
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';

export const SPEAKER_FORM_FIELDS = {
  name                : this.l10n.t('Name'),
  email               : this.l10n.t('Email'),
  position            : this.l10n.t('Position'),
  organisation        : this.l10n.t('Organisation'),
  address             : this.l10n.t('Address'),
  city                : this.l10n.t('City'),
  country             : this.l10n.t('Country'),
  mobile              : this.l10n.t('Mobile'),
  gender              : this.l10n.t('Gender'),
  shortBiography      : this.l10n.t('Short Biography'),
  longBiography       : this.l10n.t('Long Biography'),
  speakingExperience  : this.l10n.t('Speaking Experience'),
  photoUrl            : this.l10n.t('Photo'),
  website             : this.l10n.t('Website'),
  github              : 'GitHub',
  facebook            : 'Facebook',
  twitter             : 'Twitter',
  instagram           : 'Instagram',
  linkedin            : 'Linkedin',
  heardFrom           : this.l10n.t('Heard From'),
  sponsorshipRequired : this.l10n.t('Sponsorship Required')
};

export const SPEAKER_FORM_ORDER = Object.keys(SPEAKER_FORM_FIELDS);

export const SESSION_FORM_FIELDS = {
  title         : this.l10n.t('Title'),
  subtitle      : this.l10n.t('Subtitle'),
  track         : this.l10n.t('Track'),
  sessionType   : this.l10n.t('Session Type'),
  shortAbstract : this.l10n.t('Short Abstract'),
  longAbstract  : this.l10n.t('Long Abstract'),
  language      : this.l10n.t('Language'),
  level         : this.l10n.t('Level'),
  slidesUrl     : this.l10n.t('Slides'),
  videoUrl      : this.l10n.t('Video'),
  audioUrl      : this.l10n.t('Audio'),
  comments      : this.l10n.t('Comments')
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
  isComplex       : attr('boolean', { defaultValue: false }),
  description     : attr('string', { defaultValue: 'text' }),


  event             : belongsTo('event'),
  customFormOptions : hasMany('customFormOptions'),

  session: SESSION_FORM_FIELDS,

  speaker: SPEAKER_FORM_FIELDS,

  attendee: {
    firstname       : 'First Name',
    lastname        : 'Last Name',
    email           : 'Email',
    address         : 'Address',
    city            : 'City',
    state           : 'State',
    country         : 'Country',
    jobTitle        : 'Job Title',
    phone           : 'Phone',
    taxBusinessInfo : 'Tax Business Info',
    billingAddress  : 'Billing Address',
    homeAddress     : 'Home Address',
    shippingAddress : 'Shipping Address',
    company         : 'Organisation',
    workAddress     : 'Work Address',
    workPhone       : 'Work Phone',
    website         : 'Website',
    blog            : 'Blog',
    twitter         : 'Twitter',
    facebook        : 'Facebook',
    github          : 'GitHub',
    gender          : 'Gender',
    ageGroup        : 'Age Group'
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
    && (['website', 'twitter', 'github', 'facebook', 'linkedin', 'slidesUrl', 'instagram', 'videoUrl', 'audioUrl'].includes(this.fieldIdentifier));
  }),

  isRequiredObserver: observer('isRequired', function() {
    if (!this.isIncluded && this.isRequired) {
      this.set('isIncluded', true);
    }
  })
});
