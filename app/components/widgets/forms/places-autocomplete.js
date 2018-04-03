/**
 * Borrowed from https://github.com/dmuneras/ember-place-autocomplete/blob/22f9e0c2127010f76756aa5d9ebe5d267a9eae5e/addon/components/place-autocomplete-field.js
 *
 * Repo: https://github.com/dmuneras/ember-place-autocomplete
 * User: @dmuneras
 *
 */

import TextField from '@ember/component/text-field';

import { isPresent, isEmpty } from '@ember/utils';
import { run } from '@ember/runloop';

export default TextField.extend({
  classNames           : ['place-autocomplete--input'],
  types                : 'geocode',
  restrictions         : {},
  tabindex             : 0,
  withGeoLocate        : false,
  setValueWithProperty : 'formatted_address',

  // @see https://developers.google.com/maps/documentation/javascript/places-autocomplete#set_search_area
  geolocate() {
    let navigator = this.get('navigator') || ((window) ? window.navigator : null);
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let google = this.get('google') || window.google;
        let geolocation = {
          lat : position.coords.latitude,
          lng : position.coords.longitude
        };
        let circle = new google.maps.Circle({
          center : geolocation,
          radius : position.coords.accuracy
        });
        this.get('autocomplete').setBounds(circle.getBounds());
      });
    }
  },

  didInsertElement() {
    this._super(...arguments);
    run.scheduleOnce('afterRender', this, 'setupComponent');
  },

  setupComponent() {
    this.getAutocomplete();
    this.get('autocomplete').addListener('place_changed', () => {
      run(() => { this.placeChanged() });
    });
    if (this.get('withGeoLocate')) {
      this.geolocate();
    }
  },


  willDestroy() {
    if (isPresent(this.get('autocomplete'))) {
      let google = this.get('google') || ((window) ? window.google : null);
      if (google) {
        google.maps.event.clearInstanceListeners(this.get('autocomplete'));
      }
    }
  },

  getAutocomplete() {
    if (isEmpty(this.get('autocomplete'))) {
      if (document && window) {
        let [inputElement] = this.$(),
            google = this.get('google') || window.google,
            options = { types: this._typesToArray() };
        if (Object.keys(this.get('restrictions')).length > 0) {
          options.componentRestrictions = this.get('restrictions');
        }
        let autocomplete = new google.maps.places.Autocomplete(inputElement, options);
        this.set('autocomplete', autocomplete);
      }
    }
  },

  placeChanged() {
    if (this.get('placeChangedCallback')) {
      let place = this.get('autocomplete').getPlace();
      this.get('placeChangedCallback')(place);
      this.set('value', place[this.get('setValueWithProperty')]);
    }
  },

  _typesToArray() {
    if (this.get('types') !== '') {
      return this.get('types').split(',');
    } else {
      return [];
    }
  },

  actions: {
    focusOut() {
      if (this.get('focusOutCallback')) {
        this.get('focusOutCallback')();
      }
    }
  }
});
