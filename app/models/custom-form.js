import { computed, observer } from '@ember/object';
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';

export const SPEAKER_FORM_FIELDS = {
  name                : 'Name',
  email               : 'Email',
  position            : 'Position',
  organisation        : 'Organisation',
  address             : 'Address',
  city                : 'City',
  country             : 'Country',
  mobile              : 'Mobile',
  gender              : 'Gender',
  shortBiography      : 'Short Biography',
  longBiography       : 'Long Biography',
  speakingExperience  : 'Speaking Experience',
  photoUrl            : 'Photo',
  website             : 'Website',
  github              : 'GitHub',
  facebook            : 'Facebook',
  twitter             : 'Twitter',
  instagram           : 'Instagram',
  linkedin            : 'Linkedin',
  heardFrom           : 'Heard From',
  sponsorshipRequired : 'Sponsorship Required'
};

export const SPEAKER_FORM_ORDER = Object.keys(SPEAKER_FORM_FIELDS);

export const SESSION_FORM_FIELDS = {
  title         : 'Title',
  subtitle      : 'Subtitle',
  track         : 'Track',
  sessionType   : 'Session Type',
  shortAbstract : 'Short Abstract',
  longAbstract  : 'Long Abstract',
  language      : 'Language',
  level         : 'Level',
  slidesUrl     : 'Slides',
  videoUrl      : 'Video',
  audioUrl      : 'Audio',
  comments      : 'Comments'
};

export const SESSION_FORM_ORDER = Object.keys(SESSION_FORM_FIELDS);

export default ModelBase.extend({

  fieldIdentifier : attr('string'),
  form            : attr('string'),
  type            : attr('string', { defaultValue: 'text' }),
  name            : attr('string'),
  isRequired      : attr('boolean', { defaultValue: false }),
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
    company         : 'Company',
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

  segmentedLinkName: computed('fieldIdentifier', function() {
    return `segmentedLink${this.fieldIdentifier.charAt(0).toUpperCase()  + this.fieldIdentifier.slice(1)}`;
  }),

  isRequiredObserver: observer('isRequired', function() {
    if (!this.isIncluded && this.isRequired) {
      this.set('isIncluded', true);
    }
  })
});
