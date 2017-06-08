import Ember from 'ember';
import { chain } from 'lodash';

const { Controller, computed } = Ember;

export default Controller.extend({
  sessionsByTracks: computed('model.sessions.[]', 'selectedTrackId', function() {
    if (this.get('selectedTrackId')) {
      return chain(this.get('model.sessions'))
        .filter(['track.id', this.get('selectedTrackId')])
        .orderBy(['track.name', 'startAt'])
        .value();
    } else {
      return chain(this.get('model.sessions'))
        .orderBy(['track.name', 'startAt'])
        .groupBy('track.name')
        .value();
    }
  }),
  tracks: computed('model.sessions.[]', function() {
    return chain(this.get('model.sessions'))
      .map('track')
      .uniqBy('id')
      .orderBy('name')
      .value();
  })
});
