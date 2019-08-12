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

    switch (this.rangePosition) {
      case 'start':
        defaultOptions.endCalendar = this.$().closest('.fields').find('.ui.calendar.time.picker');
        break;
      case 'end':
        defaultOptions.startCalendar = this.$().closest('.fields').find('.ui.calendar.time.picker');
        break;
    }

    this.$().calendar(merge(defaultOptions, this.options));
  },
  actions: {
    onChange() {
      if (this.onChange) {
        this.sendAction('onChange', this.value);
      }
    }
  }

});
