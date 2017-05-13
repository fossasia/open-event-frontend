import Ember from 'ember';

const { $, Service, computed, computed: { equal }, run: { next, debounce } } = Ember;

export default Service.extend({

  deviceType: 'computer',

  isMobile       : equal('deviceType', 'mobile'),
  isComputer     : equal('deviceType', 'computer'),
  isTablet       : equal('deviceType', 'tablet'),
  isLargeMonitor : equal('deviceType', 'largeMonitor'),
  isWideScreen   : equal('deviceType', 'widescreen'),

  isInternetExplorer: computed(function() {
    let rv = -1;
    if (navigator.appName === 'Microsoft Internet Explorer') {
      let ua = navigator.userAgent;
      let re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
      if (re.exec(ua) !== null) {
        rv = parseFloat(RegExp.$1);
      }
    } else if (navigator.appName === 'Netscape') {
      let ua = navigator.userAgent;
      let re = new RegExp('Trident/.*rv:([0-9]{1,}[\.0-9]{0,})');
      if (re.exec(ua) !== null) {
        rv = parseFloat(RegExp.$1);
      }
    }
    return rv !== -1;
  }),

  getDeviceType() {
    try {
      return document.defaultView
        .getComputedStyle(
          document.querySelector('#device-type-identifier'), '::after'
        )
        .getPropertyValue('content')
        .replace(/['"]+/g, '');
    } catch (e) {
      return 'computer';
    }
  },

  init() {
    this._super(...arguments);
    next(this, () => {
      this.set('deviceType', this.getDeviceType());
    });
    $(window).resize(() => {
      debounce(this, () => {
        this.set('deviceType', this.getDeviceType());
      }, 200);
    });
  }

});
