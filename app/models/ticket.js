import DS from 'ember-data';
import Ember from 'ember';
import moment from 'moment';
import { FORM_DATE_FORMAT, FORM_TIME_FORMAT } from 'open-event-frontend/utils/dictionary/date-time';

const { computed } = Ember;
const { Model, attr } = DS;

export default Model.extend({
  name               : attr('string'),
  type               : attr('string'),
  price              : attr('number'),
  quantity           : attr('number', { defaultValue: 100 }),
  description        : attr('string'),
  descriptionVisible : attr('boolean', { defaultValue: true }),
  ticketHidden       : attr('boolean', { defaultValue: false }),
  salesStartDateTime : attr('date', { defaultValue: () => moment().startOf('day').toDate() }),
  salesEndDateTime   : attr('date', { defaultValue: () => moment().add(10, 'days').startOf('day').toDate() }),
  minOrder           : attr('number', { defaultValue: 1 }),
  maxOrder           : attr('number', { defaultValue: 10 }),
  groups             : attr('strings', { defaultValue: '' }),
  absorbFees         : attr('boolean', { defaultValue: true }),

  hasOrders: false,

  startDate: computed('salesStartDateTime', {
    get() {
      return moment(this.get('salesStartDateTime')).format(FORM_DATE_FORMAT);
    },
    set(key, value) {
      const newDate = moment(value, FORM_DATE_FORMAT);
      const oldDate = moment(this.get('salesStartDateTime'));
      oldDate.date(newDate.date());
      oldDate.month(newDate.month());
      oldDate.year(newDate.year());
      this.set('salesStartDateTime', oldDate.toDate());
      return value;
    }
  }),

  startTime: computed('salesStartDateTime', {
    get() {
      return moment(this.get('salesStartDateTime')).format(FORM_TIME_FORMAT);
    },
    set(key, value) {
      const newDate = moment(value, FORM_TIME_FORMAT);
      const oldDate = moment(this.get('salesStartDateTime'));
      oldDate.hour(newDate.hour());
      oldDate.minute(newDate.minute());
      this.set('salesStartDateTime', oldDate.toDate());
      return value;
    }
  }),

  endDate: computed('salesEndDateTime', {
    get() {
      return moment(this.get('salesEndDateTime')).format(FORM_DATE_FORMAT);
    },
    set(key, value) {
      const newDate = moment(value, FORM_DATE_FORMAT);
      const oldDate = moment(this.get('salesEndDateTime'));
      oldDate.date(newDate.date());
      oldDate.month(newDate.month());
      oldDate.year(newDate.year());
      this.set('salesEndDateTime', oldDate.toDate());
      return value;
    }
  }),

  endTime: computed('salesEndDateTime', {
    get() {
      return moment(this.get('salesEndDateTime')).format(FORM_TIME_FORMAT);
    },
    set(key, value) {
      const newDate = moment(value, FORM_TIME_FORMAT);
      const oldDate = moment(this.get('salesEndDateTime'));
      oldDate.hour(newDate.hour());
      oldDate.minute(newDate.minute());
      this.set('salesEndDateTime', oldDate.toDate());
      return value;
    }
  })


});
