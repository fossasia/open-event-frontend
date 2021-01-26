import $ from 'jquery';
import Component from '@ember/component';
import { merge } from 'lodash-es';
import moment from 'moment';
import { FORM_TIME_FORMAT } from 'open-event-frontend/utils/dictionary/date-time';

export default Component.extend({

  classNames        : ['ui', 'calendar', 'time', 'picker', 'input', 'fluid'],
  classNameBindings : ['icon:left', 'icon'],

  icon: true,

  today         : true,
  rangePosition : 'none',
  format        : FORM_TIME_FORMAT,

  options: {},

  didInsertElement() {
    this._super(...arguments);
    const defaultOptions = {
      type      : 'time',
      formatter : {
        time: date => {
          if (!date) {return ''}
          return moment(date).format(this.format);
        }
      }
    };

    $(this.element).calendar(merge(defaultOptions, this.options));
  },
  actions: {
    onChange() {
      if (this.onChange) {
        this.onChange(this.value);
      }
    }
  }

});
