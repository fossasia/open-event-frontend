/* eslint-env node */
'use strict';

module.exports = {
  name: 'cache-updater',

  isDevelopingAddon() {
    return true;
  },

  contentFor(type, config) {
    if (type === this.name) {
      return `
        <div id="app-update-notification" class="paper-snackbar" style="opacity: 1;">
          A new version of ${config.appName} is available.
          <button class="action" onclick="window.location.reload();">Update now</button>
        </div>
        <script type='text/javascript'>
          window.addEventListener('load', function () {
            window.applicationCache.addEventListener('updateready', function (e) {
              if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
                window.applicationCache.swapCache();
                document.getElementById('app-update-notification').style.opacity = 1;
              }
            }, false);
          }, false);
        </script>
      `;
    }
  }
};
