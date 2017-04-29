import Ember from 'ember';
import moment from 'moment';
import { FORM_DATE_FORMAT } from 'open-event-frontend/utils/dictionary/date-time';

const { Component, merge } = Ember;

export default Component.extend({

  classNames        : ['ui', 'calendar', 'date', 'picker', 'input', 'fluid'],
  classNameBindings : ['icon:left', 'icon'],

  icon          : true,
  today         : true,
  rangePosition : 'none',
  format        : FORM_DATE_FORMAT,

  options: {},

  didInsertElement() {
    this._super.call(this);
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
  }

});
