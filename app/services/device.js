import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { or, equal } from '@ember/object/computed';
import $ from 'jquery';
import Service, { inject as service } from '@ember/service';
import { debounce } from '@ember/runloop';
import { forOwn } from 'lodash-es';

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

@classic
export default class DeviceService extends Service {
  @service
  fastboot;

  @computed('currentWidth')
  get deviceType() {
    let deviceType = 'computer';
    forOwn(breakpoints, (value, key) => {
      if (this.currentWidth >= value.min && (!Object.prototype.hasOwnProperty.call(value, 'max') || this.currentWidth <= value.max)) {
        deviceType = key;
      }
    });
    return deviceType;
  }

  @equal('deviceType', 'mobile')
  isMobile;

  @equal('deviceType', 'computer')
  isComputer;

  @equal('deviceType', 'tablet')
  isTablet;

  @equal('deviceType', 'largeMonitor')
  isLargeMonitor;

  @equal('deviceType', 'widescreen')
  isWideScreen;

  @or('isComputer', 'isLargeMonitor', 'isWideScreen')
  isBiggerThanTablet;

  @computed
  get isInternetExplorer() {

    if (this.fastboot.isFastBoot) {
      return false;
    }

    let rv = -1;
    if (navigator.appName === 'Microsoft Internet Explorer') {
      const ua = navigator.userAgent;
      const re = new RegExp('MSIE ([0-9]{1,}[\\.0-9]{0,})');
      if (re.exec(ua) !== null) {
        rv = parseFloat(RegExp.$1);
      }
    } else if (navigator.appName === 'Netscape') {
      const ua = navigator.userAgent;
      const re = new RegExp('Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})');
      if (re.exec(ua) !== null) {
        rv = parseFloat(RegExp.$1);
      }
    }
    return rv !== -1;
  }

  init() {
    super.init(...arguments);

    if (this.fastboot.isFastBoot) {
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
}
