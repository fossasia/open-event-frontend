/* eslint-env node */
"use strict";

module.exports = {
  name: "start-title",

  isDevelopingAddon() {
    return true;
  },

  contentFor(type, config) {
    return type === this.name && `<title>${config.appName}</title>`;
  },
};
