import Ember from 'ember';
import { map } from 'lodash';

const { Component, computed } = Ember;

export default Component.extend({

  enableAll   : true,
  currentStep : 1,

  currentIndex: computed('currentStep', function() {
    return this.get('currentStep') - 1;
  }),

  processedSteps: computed('steps', 'currentIndex', 'enableAll', function() {
    return map(this.get('steps'), (step, index) => {
      if (!this.get('enableAll') && index > this.get('currentIndex')) {
        step.isDisabled = true;
      }
      if (index < this.get('currentIndex')) {
        step.isCompleted = true;
      }
      return step;
    });
  })
});
