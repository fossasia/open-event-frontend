import Ember from 'ember';
import moment from 'moment';

const { Route, RSVP } = Ember;

export default Route.extend({
  model() {
    const eventDetails = this._super(...arguments);
    return RSVP.hash({
      event   : eventDetails,
      tickets : eventDetails.query('tickets', {
        filter: [
          {
            and: [
              {
                name : 'sales-starts-at',
                op   : 'le',
                val  : moment().toISOString()
              },
              {
                name : 'sales-ends-at',
                op   : 'ge',
                val  : moment().toISOString()
              }
            ]
          }
        ]
      }),
      speakers: [{  name: 'Speaker 1', organisation: 'Org 1', isFeatured: false, socialLinks: [{ name: 'facebook', url: '#' }]  },
        { name: 'Speaker 2', organisation: 'Org 2', isFeatured: false, socailLinks: [{ name: 'facebook', url: '#' }] },
        { name: 'Speaker 3', organisation: 'Org 3', isFeatured: true, socialLinks: [{ name: 'linkedin', url: '#' }], short_biography: 'Full-stack developer with experience in PHP, Python &amp; Ember.JS. Plays around with Kubernetes and Containers. Avid open source contributor.' },
        { name: 'Speaker 4', organisation: 'Org 4', isFeatured: true, socialLinks: [{ name: 'twitter', url: '#' }], short_biography: 'Full-stack developer with experience in PHP, Python &amp; Ember.JS. Plays around with Kubernetes and Containers. Avid open source contributor.' },
        { name: 'Speaker 5', organisation: 'Org 5', isFeatured: false, socialLinks: [{ name: 'home', url: '#' }],  short_biography: 'Full-stack developer with experience in PHP, Python &amp; Ember.JS. Plays around with Kubernetes and Containers. Avid open source contributor.' }],

      sponsors: [{ name: 'Sponsor 2', url: '#', logoUrl: 'http://placehold.it/150x60', level: 2, type: 'Gold Sponsor', description: '' },
        { name: 'Sponsor 1', url: '#', logoUrl: 'http://placehold.it/150x60', level: 1, type: 'Gold Sponsor', description: '' },
        { name: 'Sponsor 3', url: '#', logoUrl: 'http://placehold.it/150x60', level: 1, type: 'Silver Sponsor', description: '' }]
    });
  }
});
