import { computed } from '@ember/object';
import moment from 'moment';
import { values } from 'lodash-es';
import { isValidUrl } from 'open-event-frontend/utils/validators';
import { FORM_DATE_FORMAT, FORM_TIME_FORMAT } from 'open-event-frontend/utils/dictionary/date-time';

// Social Platforms
export const socialPlatforms = ['twitter', 'facebook', 'instagram', 'linkedin', 'youtube', 'github', 'gitlab', 'patreon', 'vimeo', 'flicker', 'groups.google', 'vk', 'xing', 'weibo'];

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
          protocol : 'https://',
          address  : ''
        };
      }
      // check if the input url is a social url or not
      const splittedDomain = splitted[1].split('.com/');
      const isSocialUrl = socialPlatforms.includes(splittedDomain[0]);
      if (isSocialUrl) {
        return {
          protocol : `${splitted[0]}://${splittedDomain[0]}.com/`,
          address  : splittedDomain.slice(-1)[0] // last element is username
        };
      }
      const isHTTPSOnly = splitted[0] === 'https';
      return {
        protocol : (isHTTPSOnly ? 'https' : splitted[0]) + '://',
        address  : splitted[1]
      };
    },
    set(key, value) {
      const finalLink = values(value).join('');
      const isUserNamePresent = values(value)[1];
      if (finalLink && isValidUrl(finalLink.trim()) && isUserNamePresent) {
        this.set(property, finalLink.trim());
      } else {
        this.set(property, null);
      }
      return value;
    }
  });
};

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
      if (this.constructor.modelName === 'event') {
        momentDate = momentDate.tz(this.timezone);
      }
      return momentDate.format(getFormat(segmentFormat));
    },
    set(key, value) {
      let newDate = moment(value, getFormat(segmentFormat));
      if (this.constructor.modelName === 'event') {
        newDate = newDate.tz(this.timezone, true);
      }
      let oldDate = newDate;
      if (this.get(property)) {
        oldDate = moment(this.get(property), segmentFormat === 'date' ? FORM_DATE_FORMAT : FORM_TIME_FORMAT);
        if (this.constructor.modelName === 'event') {
          oldDate = oldDate.tz(this.timezone, true);
        }
      } else {
        oldDate = newDate;
      }
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
