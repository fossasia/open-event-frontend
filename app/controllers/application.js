import Ember from 'ember';

const { Controller, inject: { service } } = Ember;

export default Controller.extend({
  routing: service('-routing')
});
