import Ember from 'ember';
import moment from 'moment';
import { FORM_TIME_FORMAT } from 'open-event-frontend/utils/dictionary';

const { Component, merge, on } = Ember;

export default Component.extend({

  classNames: ['ui', 'calendar', 'time', 'picker'],

  today         : true,
  rangePosition : 'none',
  format        : FORM_TIME_FORMAT,

  options: {},

  _didInsertElement: on('didInsertElement', function() {
    const defaultOptions = {
      type      : 'time',
      formatter : {
        time: date => {
          if (!date) {return ''}
          return moment(date).format(this.get('format'));
        }
      }
    };

    switch (this.get('rangePosition')) {
      case 'start':
        defaultOptions.endCalendar = this.$().closest('.fields').find('.ui.calendar.time.picker');
        break;
      case 'end':
        defaultOptions.startCalendar = this.$().closest('.fields').find('.ui.calendar.time.picker');
        break;
    }

    this.$().calendar(merge(defaultOptions, this.get('options')));
  })
});
