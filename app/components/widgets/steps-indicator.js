import Component from '@ember/component';
import Object, { observer, computed } from '@ember/object';
import { map, findIndex } from 'lodash-es';

export default Component.extend({

  enableAll   : true,
  autoSteps   : false,
  currentStep : 1,

  currentIndex: computed('currentStep', function() {
    return this.currentStep - 1;
  }),

  currentStepComputed: observer('session.currentRouteName', 'autoSteps', function() {
    if (this.autoSteps) {
      this.set('currentStep', findIndex(this.steps, ['route', this.get('session.currentRouteName')]) + 1);
    }
  }),

  processedSteps: computed('steps', 'currentIndex', 'enableAll', function() {
    return map(this.steps, (step, index) => {
      step = Object.create(step);
      if (!this.enableAll && index > this.currentIndex) {
        step.set('isDisabled', true);
      }
      if (this.disableAll && index !== this.currentIndex) {
        step.set('isDisabled', true);
      }
      if (index < this.currentIndex) {
        step.set('isCompleted', true);
      }
      return step;
    });
  }),

  didInsertElement() {
    this._super(...arguments);
    this.notifyPropertyChange('autoSteps');
  }
});
