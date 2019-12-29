/* eslint-disable no-duplicate-imports */
import $ from 'jquery';
import { computed } from '@ember/object';
import { equal, or } from '@ember/object/computed';
import { debounce } from '@ember/runloop';
import { forOwn } from 'lodash-es';
import Service from '@ember/service';
import { inject as service } from '@ember/service';

/**
 * Keeping this outside the service object to keep it lean and faster to loop over
 * @type {{mobile: {max: number}, tablet: {max: number, min: number}, computer: {max: number, min: number}, largeMonitor: {max: number, min: number}, widescreen: {min: number}}}
 */
const breakpoints = {
  mobile: {
    max : 767,
    min : 0
  },
  tablet: {
    max : 991,
    min : 768
  },
  computer: {
    max : 1199,
    min : 992
  },
  largeMonitor: {
    max : 1919,
    min : 1200
  },
  widescreen: {
    min: 1920
  }
};

export default Service.extend({

  fastboot: service(),

  deviceType: computed('currentWidth', function() {
    let deviceType = 'computer';
    forOwn(breakpoints, (value, key) => {
      if (this.currentWidth >= value.min && (!value.hasOwnProperty('max') || this.currentWidth <= value.max)) {
        deviceType = key;
      }
    });
    return deviceType;
  }),

  isMobile           : equal('deviceType', 'mobile'),
  isComputer         : equal('deviceType', 'computer'),
  isTablet           : equal('deviceType', 'tablet'),
  isLargeMonitor     : equal('deviceType', 'largeMonitor'),
  isWideScreen       : equal('deviceType', 'widescreen'),
  isBiggerThanTablet : or('isComputer', 'isLargeMonitor', 'isWideScreen'),


  isInternetExplorer: computed(function() {

    if (this.get('fastboot.isFastBoot')) {
      return false;
    }

    let rv = -1;
    if (navigator.appName === 'Microsoft Internet Explorer') {
      let ua = navigator.userAgent;
      let re = new RegExp('MSIE ([0-9]{1,}[\\.0-9]{0,})');
      if (re.exec(ua) !== null) {
        rv = parseFloat(RegExp.$1);
      }
    } else if (navigator.appName === 'Netscape') {
      let ua = navigator.userAgent;
      let re = new RegExp('Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})');
      if (re.exec(ua) !== null) {
        rv = parseFloat(RegExp.$1);
      }
    }

    return rv !== -1;
  }),

  init() {
    this._super(...arguments);

    if (this.get('fastboot.isFastBoot')) {
      this.currentWidth = 1024;
      return;
    }

    this.currentWidth = document.body.clientWidth;

    $(window).resize(() => {
      debounce(() => {
        if (!(this.isDestroyed || this.isDestroying)) {
          this.set('currentWidth', document.body.clientWidth);
        }
      }, 200);
    });
  }

});
