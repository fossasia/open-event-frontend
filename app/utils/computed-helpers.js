import { computed } from '@ember/object';
import moment from 'moment';
import { values } from 'lodash-es';
import { isValidUrl } from 'open-event-frontend/utils/validators';
import { FORM_DATE_FORMAT, FORM_TIME_FORMAT } from 'open-event-frontend/utils/dictionary/date-time';

/**
 * Get/set a splitted URL from/to a string URL field
 *
 * @param property The string URL field
 * @returns {*}
 */
export const computedSegmentedLink = function(property) {
  return computed(property, {
    get() {
      const splitted = this.get(property) ? this.get(property).split('://') : [];
      if (!splitted || splitted.length === 0 || (splitted.length === 1 && splitted[0].includes('http'))) {
        return {
          protocol : 'https',
          address  : ''
        };
      }
      return {
        protocol : splitted[0],
        address  : splitted[1]
      };
    },
    set(key, value) {
      const finalLink = values(value).join('://');
      if (finalLink && isValidUrl(finalLink.trim())) {
        this.set(property, finalLink.trim());
      } else {
        this.set(property, null);
      }
      return value;
    }
  });
};

/**
 * Get set splitted date time from/to a Full datetime object
 * @param property The full date time object
 * @param segmentFormat The part of the date to be returned. (time/date or a custom format)
 * @returns {*}
 */
export const computedDateTimeSplit = function(property, segmentFormat) {
  return computed(property, {
    get() {
      // if (property === 'endsAt' && segmentFormat === 'date') {
      //   return moment(this.get(property)).add(1, 'days').format(getFormat(segmentFormat));
      // } The following line was adding one extra day to the endsAt Attribute . Commenting it to fix the issue .
      return moment(this.get(property)).format(getFormat(segmentFormat));
    },
    set(key, value) {
      const newDate = moment(value, getFormat(segmentFormat));
      let oldDate = moment(this.get(property));
      if (segmentFormat === 'time') {
        oldDate.hour(newDate.hour());
        oldDate.minute(newDate.minute());
      } else if (segmentFormat === 'date') {
        oldDate.date(newDate.date());
        oldDate.month(newDate.month());
        oldDate.year(newDate.year());
      } else {
        oldDate = newDate;
      }
      this.set(property, oldDate);
      this.set('endsAt', oldDate);
      return value;
    }
  });
};

function getFormat(segmentFormat) {
  return segmentFormat === 'time' ? FORM_TIME_FORMAT : (segmentFormat === 'date' ? FORM_DATE_FORMAT : segmentFormat);
}
