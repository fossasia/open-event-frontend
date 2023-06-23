import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { A } from '@ember/array';


export default Component.extend(FormMixin, {
  selectedFields : [],
  value1         : [],
  languageForms  : A([]),
  init() {
    this._super(...arguments);
  },

  actions: {
    onChange1(checked, value, valueList) {
      this.value1 = valueList;
    },
    valueChange() {
    },
    onChange() {
    }
  }
});
