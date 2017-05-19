import Ember from 'ember';

const { Controller, computed, String } = Ember;

export default Controller.extend({

  speakers: [{  name: 'Speaker 1', organisation: 'Org 1', isFeatured: false, socialLinks: [{ name: 'facebook', url: '#' }]  },
  { name: 'Speaker 2', organisation: 'Org 2', isFeatured: false, socailLinks: [{ name: 'facebook', url: '#' }] },
  { name: 'Speaker 3', organisation: 'Org 3', isFeatured: true, socialLinks: [{ name: 'linkedin', url: '#' }], short_biography: 'Full-stack developer with experience in PHP, Python &amp; Ember.JS. Plays around with Kubernetes and Containers. Avid open source contributor.' },
  { name: 'Speaker 4', organisation: 'Org 4', isFeatured: true, socialLinks: [{ name: 'twitter', url: '#' }], short_biography: 'Full-stack developer with experience in PHP, Python &amp; Ember.JS. Plays around with Kubernetes and Containers. Avid open source contributor.' },
  { name: 'Speaker 5', organisation: 'Org 5', isFeatured: false, socialLinks: [{ name: 'home', url: '#' }],  short_biography: 'Full-stack developer with experience in PHP, Python &amp; Ember.JS. Plays around with Kubernetes and Containers. Avid open source contributor.' }],

  sponsors: [{ name: 'Sponsor 2', url: '#', logoUrl: 'http://placehold.it/150x60', level: 2, type: 'Gold Sponsor', description: '' },
    { name: 'Sponsor 1', url: '#', logoUrl: 'http://placehold.it/150x60', level: 1, type: 'Gold Sponsor', description: '' },
    { name: 'Sponsor 3', url: '#', logoUrl: 'http://placehold.it/150x60', level: 1, type: 'Silver Sponsor', description: '' }
  ],

  tickets: [{ description: 'Community ticket', date: 'Mon, May 22', price: 2.50, name: 'Community Ticket', type: 'paid', id: 1, quantity: 10, orderQuantity: 0, min: 0, max: 5 },
    { description: 'Standard ticket', date: 'Mon, May 22', price: 3.05, name: 'Standard Ticket', type: 'paid', id: 2, quantity: 10, orderQuantity: 0, min: 0, max: 5 },
    { description: 'Super ticket', date: 'Mon, May 22', price: 5.00, name: 'Super Ticket', type: 'paid', id: 3, quantity: 10, orderQuantity: 0, min: 0, max: 5 }
  ],

  featuredSpeakers: computed.filterBy('speakers', 'isFeatured', true),

  nonFeaturedSpeakers: computed.filterBy('speakers', 'isFeatured', false),

  htmlSafeDescription: computed('model.event.description', function() {
    return String.htmlSafe(this.get('model.event.description'));
  })

});
