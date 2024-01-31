/* eslint-env node */
'use strict';

module.exports = {
  name: 'start-title',

  isDevelopingAddon() {
    return true;
  },

  contentFor(type, config) {
    if (type === this.name) {
      return `<title>${config.appName}</title>`;
    }
  }
};
