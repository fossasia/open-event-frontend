import Ember from 'ember';
import { forOwn } from 'lodash';

const { $, Service, computed, computed: { equal }, run: { debounce } } = Ember;

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

  currentWidth: document.body.clientWidth,

  deviceType: computed('currentWidth', function() {
    let deviceType = 'computer';
    const currentWidth = this.get('currentWidth');
    forOwn(breakpoints, (value, key) => {
      if (currentWidth >= value.min && (!value.hasOwnProperty('max') || currentWidth <= value.max)) {
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
  isBiggerThanTablet : computed.or('isComputer', 'isLargeMonitor', 'isWideScreen'),


  isInternetExplorer: computed(function() {
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
    $(window).resize(() => {
      debounce(this, () => {
        this.set('currentWidth', document.body.clientWidth);
      }, 200);
    });
  }

});
