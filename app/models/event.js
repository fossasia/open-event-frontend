import DS from 'ember-data';
import Ember from 'ember';
import moment from 'moment';

const { Model, attr } = DS;
const { computed, inject: { service } } = Ember;

export default Model.extend({

  routing: service('-routing'),

  identifier             : attr('string'),
  name                   : attr('string'),
  description            : attr('string'),
  startTime              : attr('date', { defaultValue: () => moment().add(1, 'months').startOf('day').toDate() }),
  endTime                : attr('date', { defaultValue: () => moment().add(1, 'months').hour(17).minute(0).toDate() }),
  locationName           : attr('string'),
  searchableLocationName : attr('string'),

  thumbnail       : attr('string'),
  large           : attr('string'),
  backgroundImage : attr('string'),
  placeholderUrl  : attr('string'),

  longitude : attr('number'),
  latitude  : attr('number'),

  type     : attr('string'),
  topic    : attr('string'),
  subTopic : attr('string'),

  schedulePublishedOn: attr('date'),

  organizerName        : attr('string'),
  organizerDescription : attr('string'),
  email                : attr('string'),

  eventUrl      : attr('string'),
  ticketUrl     : attr('string'),
  codeOfConduct : attr('string'),

  state   : attr('string'),
  privacy : attr('string'),

  callForPapers  : attr(),
  licenseDetails : attr(),
  version        : attr(),

  shortLocationName: computed('locationName', function() {
    if (!this.get('locationName')) {
      return '';
    }
    return this.get('locationName').split(',')[0];
  }),

  url: computed('identifier', function() {
    return `${location.protocol}//${location.hostname}${this.get('routing.router').generate('public', this.get('id'))}`;
  })

/*
  sessions        : hasMany('session'),
  sponsors        : hasMany('sponsor'),
  microlocations  : hasMany('microlocation'),
  tracks          : hasMany('track'),
  tickets         : hasMany('ticket'),
  socialLinks     : hasMany('social-link'),
  callForSpeakers : belongsTo('call-for-speakers')
*/

});
