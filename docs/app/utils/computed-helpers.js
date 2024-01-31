import { computed } from '@ember/object';
import moment from 'moment-timezone';
import { FORM_DATE_FORMAT, FORM_TIME_FORMAT } from 'open-event-frontend/utils/dictionary/date-time';

/**
 * Get, set split date time from/to a Full datetime object
 * @param property The full date time object
 * @param segmentFormat The part of the date to be returned. (time/date or a custom format)
 * @param endProperty Optional end field name for date or time.
 * @returns {*}
 */
export const computedDateTimeSplit = function(property, segmentFormat, endProperty) {
  return computed(property, {
    get() {
      let momentDate = moment(this.get(property));
      const timezone = getTimezone(this);
      if (timezone) {
        momentDate = momentDate.tz(timezone);
      }
      return momentDate.format(getFormat(segmentFormat));
    },
    set(key, value) {
      let newDate = moment(value, getFormat(segmentFormat));
      const timezone = getTimezone(this);
      if (timezone) {
        newDate = newDate.tz(timezone, true);
      }
      let oldDate = newDate;
      if (this.get(property)) {
        oldDate = moment(this.get(property), segmentFormat === 'date' ? FORM_DATE_FORMAT : FORM_TIME_FORMAT);
        if (timezone) {
          oldDate = oldDate.tz(timezone, true);
        }
      } else {
        oldDate = newDate;
      }
      if (segmentFormat === 'time') {
        oldDate.hour(newDate.hour());
        oldDate.minute(newDate.minute());
        oldDate.second(newDate.second());
        oldDate.millisecond(newDate.millisecond());
      } else if (segmentFormat === 'date') {
        oldDate.date(newDate.date());
        oldDate.month(newDate.month());
        oldDate.year(newDate.year());
      } else {
        oldDate = newDate;
      }
      this.set(property, oldDate);
      if (endProperty) {
        if (segmentFormat === 'date' && this.get(endProperty) < oldDate) {
          this.set(endProperty, oldDate);
        }
      }
      return value;
    }
  });
};

function getFormat(segmentFormat) {
  return segmentFormat === 'time' ? FORM_TIME_FORMAT : (segmentFormat === 'date' ? FORM_DATE_FORMAT : segmentFormat);
}

function getTimezone(model) {
  if (model.timezone) {
    return model.timezone;
  }
  if ('event' in model) {
    return model.event.get('timezone');
  }
}
