import Ember from 'ember';
import { eventTypes, eventTopics } from 'open-event-frontend/utils/dictionary/event';
import { orderBy } from 'lodash';


const { Component, computed } = Ember;

export default Component.extend({
  types: computed(function() {
    return orderBy(eventTypes);
  }),

  categories: computed(function() {
    return (eventTopics);
  })
});
