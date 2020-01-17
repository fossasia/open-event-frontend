import { computed, observer } from '@ember/object';
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default ModelBase.extend({

  fieldIdentifier : attr('string'),
  form            : attr('string'),
  type            : attr('string', { defaultValue: 'text' }),
  isRequired      : attr('boolean', { defaultValue: false }),
  isIncluded      : attr('boolean', { defaultValue: false }),
  isFixed         : attr('boolean', { defaultValue: false }),
  isComplex       : attr('boolean', { defaultValue: false }),
  description     : attr('string', { defaultValue: 'text' }),


  event             : belongsTo('event'),
  customFormOptions : hasMany('customFormOptions'),

  session: {
    title         : 'Title',
    subtitle      : 'Subtitle',
    shortAbstract : 'Short Abstract',
    longAbstract  : 'Long Abstract',
    comments      : 'Comment',
    track         : 'Track',
    sessionType   : 'Session Type',
    level         : 'Level',
    language      : 'Language',
    slidesUrl     : 'Slide',
    videoUrl      : 'Video',
    audioUrl      : 'Audio'
  },

  speaker: {
    name                : 'Name',
    email               : 'Email',
    photoUrl            : 'Photo',
    organisation        : 'Organisation',
    position            : 'Position',
    address             : 'Address',
    country             : 'Country',
    city                : 'City',
    longBiography       : 'Long Biography',
    shortBiography      : 'Short Biography',
    speakingExperience  : 'Speaking Experience',
    sponsorshipRequired : 'Sponsorship Required',
    gender              : 'Gender',
    heardFrom           : 'Heard From',
    mobile              : 'Mobile',
    website             : 'Website',
    facebook            : 'Facebook',
    twitter             : 'Twitter',
    github              : 'GitHub',
    linkedin            : 'Linkedin',
    instagram           : 'Instagram'
  },

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
    gender          : 'Gender'
  },

  name: computed('fieldIdentifier', 'form', function() {
    let name = this.fieldIdentifier;
    if (!this.isComplex) {
      if (this.form === 'session') {
        name = this.get(`session.${name}`);
      } else if (this.form === 'speaker') {
        name = this.get(`speaker.${name}`);
      } else {
        name = this.get(`attendee.${name}`);
      }
    }
    return name;
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
