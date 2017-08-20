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
    title         : 'TITLE',
    subtitle      : 'SUBTITLE',
    shortAbstract : 'SHORT ABSTRACT',
    longAbstract  : 'LONG ABSTRACT',
    comments      : 'COMMENT',
    track         : 'TRACK',
    sessionType   : 'SESSION TYPE',
    level         : 'LEVEL',
    language      : 'LANGUAGE',
    slidesUrl     : 'SLIDES URL',
    videoUrl      : 'VIDEO URL',
    audioUrl      : 'AUDIO URL'
  },

  speaker: {
    name                : 'NAME',
    email               : 'EMAIL',
    photoUrl            : 'PHOTO',
    organisation        : 'ORGANISATION',
    position            : 'POSITION',
    country             : 'COUNTRY',
    city                : 'CITY',
    longBiography       : 'LONG BIOGRAPHY',
    shortBiography      : 'SHORT BIOGRAPHY',
    speakingExperience  : 'SPEAKING EXPERIENCE',
    sponsorshipRequired : 'SPONSORSHIP REQUIRED',
    gender              : 'GENDER',
    heardFrom           : 'HEARD FROM',
    mobile              : 'MOBILE',
    website             : 'WEBSITE',
    facebook            : 'FACEBOOK',
    twitter             : 'TWITTER',
    github              : 'GITHUB',
    linkedin            : 'LINKEDIN'
  },

  name: computed('fieldIdentifier', function() {
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
