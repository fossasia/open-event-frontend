import Ember from 'ember';

const { Component, merge, on } = Ember;

export default Component.extend({

  classNames: ['ui', 'calendar', 'date', 'picker'],

  today         : true,
  rangePosition : 'none',

  options: {},

  _didInsertElement: on('didInsertElement', function() {
    const defaultOptions = {
      type  : 'date',
      today : this.get('today')
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
