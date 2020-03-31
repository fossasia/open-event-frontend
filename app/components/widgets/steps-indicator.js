import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import { observes } from '@ember-decorators/object';
import Component from '@ember/component';
import Object, { computed } from '@ember/object';
import { map, findIndex } from 'lodash-es';

@classic
export default class StepsIndicator extends Component {
  @tracked enableAll = true;
  autoSteps = false;
  @tracked currentStep = 1;

  @computed('currentStep')
  get currentIndex() {
    return this.currentStep - 1;
  }

  @observes('session.currentRouteName', 'autoSteps')
  currentStepComputed() {
    if (this.autoSteps) {
      this.set('currentStep', findIndex(this.steps, ['route', this.session.currentRouteName]) + 1);
    }
  }

  @computed('steps', 'currentIndex', 'enableAll')
  get processedSteps() {
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
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.notifyPropertyChange('autoSteps');
  }
}
