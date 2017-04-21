import Ember from 'ember';

const { Controller, computed: { alias } } = Ember;

export default Controller.extend({

  data  : alias('model.data'),
  steps : alias('model.steps')

});
