import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import Ember from 'ember';
import { belongsTo } from 'ember-data/relationships';

const { observer, computed } = Ember;

export default ModelBase.extend({
  fieldIdentifier : attr('string'),
  form            : attr('string'),
  type            : attr('string', { defaultValue: 'text' }),
  isRequired      : attr('boolean', { defaultValue: false }),
  isIncluded      : attr('boolean', { defaultValue: false }),
  isFixed         : attr('boolean', { defaultValue: false }),

  event: belongsTo('event'),

  session: {
    title         : 'Title',
    subtitle      : 'Ssubtitle',
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
    github              : 'Github',
    linkedin            : 'Linkedin'
  },

  name: computed('fieldIdentifier', 'form', function() {
    let name = this.get('fieldIdentifier');
    if (this.get('form') === 'session') {
      name = this.get(`session.${name}`);
    } else {
      name = this.get(`speaker.${name}`);
    }
    return name;
  }),

  isLongText: computed('type', function() {
    return this.get('type') === 'text'
    && (['shortBiography', 'longBiography', 'longAbstract', 'shortAbstract', 'comments'].includes(this.get('fieldIdentifier')));
  }),

  isIncludedObserver: observer('isIncluded', function() {
    if (!this.get('isIncluded') && this.get('isRequired')) {
      this.set('isRequired', false);
    }
  }),

  isRequiredObserver: observer('isRequired', function() {
    if (!this.get('isIncluded') && this.get('isRequired')) {
      this.set('isIncluded', true);
    }
  })
});
