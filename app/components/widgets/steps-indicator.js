import Ember from 'ember';
import { map, findIndex } from 'lodash';

const { Component, computed, observer, Object } = Ember;

export default Component.extend({

  enableAll   : true,
  autoSteps   : false,
  currentStep : 1,

  currentIndex: computed('currentStep', function() {
    return this.get('currentStep') - 1;
  }),

  currentStepComputed: observer('session.currentRouteName', 'autoSteps', function() {
    if (this.get('autoSteps')) {
      this.set('currentStep', findIndex(this.get('steps'), ['route', this.get('session.currentRouteName')]) + 1);
    }
  }),

  processedSteps: computed('steps', 'currentIndex', 'enableAll', function() {
    return map(this.get('steps'), (step, index) => {
      step = Object.create(step);
      if (!this.get('enableAll') && index > this.get('currentIndex')) {
        step.set('isDisabled', true);
      }
      if (this.get('disableAll') && index !== this.get('currentIndex')) {
        step.set('isDisabled', true);
      }
      if (index < this.get('currentIndex')) {
        step.set('isCompleted', true);
      }
      return step;
    });
  })
});
