import Ember from 'ember';

const { Controller, computed, String } = Ember;

export default Controller.extend({

  speakers: [{  name: 'Speaker 1', organisation: 'Org 1', isFeatured: false, socialLinks: [{ name: 'facebook', url: '#' }]  },
  { name: 'Speaker 2', organisation: 'Org 2', isFeatured: false, socailLinks: [{ name: 'facebook', url: '#' }] },
  { name: 'Speaker 3', organisation: 'Org 3', isFeatured: true, socialLinks: [{ name: 'linkedin', url: '#' }], short_biography: 'Full-stack developer with experience in PHP, Python &amp; Ember.JS. Plays around with Kubernetes and Containers. Avid open source contributor.' },
  { name: 'Speaker 4', organisation: 'Org 4', isFeatured: true, socialLinks: [{ name: 'twitter', url: '#' }], short_biography: 'Full-stack developer with experience in PHP, Python &amp; Ember.JS. Plays around with Kubernetes and Containers. Avid open source contributor.' },
  { name: 'Speaker 5', organisation: 'Org 5', isFeatured: false, socialLinks: [{ name: 'home', url: '#' }],  short_biography: 'Full-stack developer with experience in PHP, Python &amp; Ember.JS. Plays around with Kubernetes and Containers. Avid open source contributor.' }],

  featuredSpeakers: computed.filterBy('speakers', 'isFeatured', true),

  nonFeaturedSpeakers: computed.filterBy('speakers', 'isFeatured', false),

  htmlSafeDescription: computed('model.event.description', function() {
    return String.htmlSafe(this.get('model.event.description'));
  })

});
