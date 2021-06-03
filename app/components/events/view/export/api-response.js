import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { buildUrl } from 'open-event-frontend/utils/url';
import ENV from 'open-event-frontend/config/environment';

export default Component.extend({

  didInsertElement() {
    this._super(...arguments);
    this.makeRequest();
  },

  isLoading: false,

  baseUrl: computed('eventId', function() {
    return `${`${ENV.APP.apiHost}/${ENV.APP.apiNamespace}/events/`}${this.eventId}`;
  }),

  displayUrl: computed('eventId', function() {
    return `${`${ENV.APP.apiHost}/${ENV.APP.apiNamespace}/events/`}${this.eventId}`;
  }),

  toggleSwitches: {
    sessions       : false,
    microlocations : false,
    tracks         : false,
    speakers       : false,
    sponsors       : false,
    tickets        : false
  },

  makeRequest() {
    this.set('isLoading', true);
    if (this.event?.state === 'draft') {
      this.set('json', 'You need to publish event in order to access event information via REST API');
      this.set('isLoading', false);
      return;
    }
    this.loader
      .load(this.displayUrl, { isExternal: true })
      .then(json => {
        json = JSON.stringify(json, null, 2);
        this.set('json', htmlSafe(syntaxHighlight(json)));
      })
      .catch(e => {
        if (this.isDestroyed) {
          return;
        }
        console.error('Error while fetching export JSON from server', e);
        this.notify.error(this.l10n.t('Could not fetch from the server'), {
          id: 'server_fetch_error'
        });
        this.set('json', 'Could not fetch from the server');
      })
      .finally(() => {
        if (this.isDestroyed) {
          return;
        }
        this.set('isLoading', false);
      });
  },

  buildDisplayUrl() {
    const newUrl = this.baseUrl;
    const include = [];

    for (const key in this.toggleSwitches) {
      if (Object.prototype.hasOwnProperty.call(this.toggleSwitches, key)) {
        this.toggleSwitches[key] && include.push(key);
      }
    }

    this.set('displayUrl', buildUrl(newUrl, {
      include: include.length > 0 ? include : undefined
    }, true));
  },

  actions: {
    checkboxChange(data) {
      this.set(`toggleSwitches.${data}`, !this.get(`toggleSwitches.${data}`));
      this.buildDisplayUrl();
      this.makeRequest();
    }
  }
});

function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][/+\-/]?\d+)?)/g, function(match) {
    let cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return `<span class=" ${cls}"> ${match}</span>`;
  });
}
