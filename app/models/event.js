import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr } = DS;
const { computed, inject: { service } } = Ember;

export default Model.extend({

  routing: service('-routing'),

  identifier             : attr('string'),
  name                   : attr('string'),
  description            : attr('string'),
  startTime              : attr('date'),
  endTime                : attr('date'),
  locationName           : attr('string'),
  searchableLocationName : attr('string'),

  thumbnail       : attr('string'),
  large           : attr('string'),
  backgroundImage : attr('string'),

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

});
