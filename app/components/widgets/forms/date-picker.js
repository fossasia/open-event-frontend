import Ember from 'ember';
import moment from 'moment';

const { Component, merge, on } = Ember;

export default Component.extend({

  classNames: ['ui', 'calendar', 'date', 'picker'],

  today         : true,
  rangePosition : 'none',
  format        : 'MM/DD/YYYY',

  options: {},

  _didInsertElement: on('didInsertElement', function() {
    const defaultOptions = {
      type      : 'date',
      today     : this.get('today'),
      formatter : {
        date: date => {
          if (!date) {return ''}
          return moment(date).format(this.get('format'));
        }
      }
    };

    switch (this.get('rangePosition')) {
      case 'start':
        defaultOptions.endCalendar = this.$().closest('.fields').find('.ui.calendar.date.picker');
        break;
      case 'end':
        defaultOptions.startCalendar = this.$().closest('.fields').find('.ui.calendar.date.picker');
        break;
    }

    this.$().calendar(merge(defaultOptions, this.get('options')));
  })
});
