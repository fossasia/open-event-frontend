import Ember from 'ember';

const { Controller, computed, String } = Ember;

export default Controller.extend({

  speakers: [{  name: 'Speaker 1', organisation: 'Org 1' },
  { name: 'Speaker 2', organisation: 'Org 2', socialLinks: [{ name: 'facebook', url: '#' }] },
  { name: 'Speaker 3', organisation: 'Org 3', socialLinks: [{ name: 'linkedin', url: '#' }] },
  { name: 'Speaker 4', organisation: 'Org 4', socialLinks: [{ name: 'twitter', url: '#' }] },
  { name: 'Speaker 5', organisation: 'Org 5', socialLinks: [{ name: 'home', url: '#' }] }],

  location: [{ latitude: 'latitude', longitude: 'longitude', locationName: 'locationName' }],

  htmlSafeDescription: computed('model.event.description', function() {
    return String.htmlSafe(this.get('model.event.description'));
  })

});
