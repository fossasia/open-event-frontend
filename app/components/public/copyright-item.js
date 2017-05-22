import Ember from 'ember';
import { licenses } from 'open-event-frontend/utils/dictionary/licenses';
import { find }  from 'lodash';

const { Component, computed } = Ember;

export default Component.extend({
  classNames : ['copyright'],
  license    : computed('licenseName', function() {
    return find(licenses, license => license.name === this.get('licenseName'));
  })
});
