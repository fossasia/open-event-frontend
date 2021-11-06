import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';

export default class Speaker extends ModelBase.extend({

  /**
   * Attributes
   */

  name               : attr('string'),
  email              : attr('string'),
  photoUrl           : attr('string'),
  thumbnailImageUrl  : attr('string'),
  iconImageUrl       : attr('string'),
  smallImageUrl      : attr('string'),
  shortBiography     : attr('string'),
  longBiography      : attr('string'),
  speakingExperience : attr('string'),
  mobile             : attr('string'),
  location           : attr('string'),
  website            : attr('string'),
  twitter            : attr('string'),
  facebook           : attr('string'),
  github             : attr('string'),
  linkedin           : attr('string'),
  mastodon           : attr('string'),
  instagram          : attr('string'),
  organisation       : attr('string'),
  isFeatured         : attr('boolean', { default: false }),
  isEmailOverridden  : attr('boolean', { default: false }),
  position           : attr('string'),
  country            : attr('string'),
  city               : attr('string'),
  gender             : attr('string'),
  heardFrom          : attr('string'),
  order              : attr('number'),
  complexFieldValues : attr(),
  speakerPositions   : attr(),


  /**
   * Relationships
   */

  user     : belongsTo('user'),
  event    : belongsTo('event'),
  sessions : hasMany('session'),

  positionOrganisation: computed('position', 'organization', function() {
    return [this.position, this.organisation].filter(Boolean).join(', ');
  }),

  ready() {
    if (!this.complexFieldValues) {
      this.complexFieldValues = {};
    }
    if (!this.speakerPositions) {
      this.speakerPositions = {};
    }
  }

}) {

  get image() {
    return this.thumbnailImageUrl || this.photoUrl || '/images/placeholders/avatar.png';
  }

}
