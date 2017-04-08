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
          A new version of ${config.appName} is available.
          <button class="action" onclick="window.location.reload();">Update now</button>
        </div>
        <script type='text/javascript'>
          window.addEventListener('load', function () {
            window.applicationCache.addEventListener('updateready', function (e) {
              if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
                window.applicationCache.swapCache();
                const notificationContainer = document.getElementById('app-update-notification');
                notificationContainer.style.opacity = 1;
                notificationContainer.style.bottom = 0;
              }
            }, false);
          }, false);
        </script>
      `;
    }
  }
};
