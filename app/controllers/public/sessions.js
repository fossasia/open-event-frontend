import Ember from 'ember';
import { chain } from 'lodash';

const { Controller, computed } = Ember;

export default Controller.extend({
  sessions: [{ session_type: { length: '11:00', id: 12, name: 'Talk' }, shortAbstract: 'An introduction to the event', id: '1', title: 'Welcome to FOSSASIA', startAt: new Date(), endAt: new Date(), track: { color: 'green', fontColor: 'green', id: 1, name: 'Track 1' }, microlocation: { id: 2, name: 'Room 1' }, speakers: [{ shortBiography: 'Works for ORG 1', id: 0, city: 'Delhi', name: 'Arnold Singh', speakingExperience: 'GSOC 2015', organisation: 'ORG 1', longBiography: '', photo: { 'iconImageUrl': '' } }] },
  { session_type: { length: '15:00', id: 11, name: 'Talk' }, shortAbstract: 'Welcome to open source', id: '2', title: 'Introduction to Open source', startAt: new Date(), endAt: new Date(), track: { color: 'red', fontColor: 'white', id: 2, name: 'Track 2' }, microlocation: { id: 3, name: 'Room 5' }, speakers: [{ shortBiography: '', id: 0, city: 'Delhi', name: 'Tux', speakingExperience: 'Speaker at the high conference', organisation: 'ORG 2', longBiography: '', photo: { 'iconImageUrl': '' } }] }
  ],
  sessionsByTracks: computed('sessions.[]', 'selectedTrackId', function() {
    if (this.get('selectedTrackId')) {
      return chain(this.get('sessions'))
        .filter(['track.id', this.get('selectedTrackId')])
        .orderBy(['track.name', 'startAt'])
        .value();
    } else {
      return chain(this.get('sessions'))
        .orderBy(['track.name', 'startAt'])
        .groupBy('track.name')
        .value();
    }
  }),
  tracks: computed('sessions.[]', function() {
    return chain(this.get('sessions'))
      .map('track')
      .uniqBy('id')
      .orderBy('name')
      .value();
  })
});
