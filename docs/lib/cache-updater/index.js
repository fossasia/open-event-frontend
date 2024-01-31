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
        <div id="app-update-notification" class="paper-snackbar">
          ${config.appName} has been updated to a newer version.
          <button class="action" onclick="window.location.reload();">Refresh now</button>
        </div>
        <script type='text/javascript'>
          if (window) {
            window.addEventListener('load', function () {
              if (window.applicationCache) {
                window.applicationCache.addEventListener('updateready', function (e) {
                  if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
                    window.applicationCache.swapCache();
                    var notificationContainer = document.getElementById('app-update-notification');
                    if (notificationContainer) {
                      notificationContainer.style.opacity = 1;
                      notificationContainer.style.bottom = 0;
                    }
                  }
                }, false);
              }
            }, false);
          }
        </script>
      `;
    }
  }
};
