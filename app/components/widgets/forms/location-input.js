import Component from '@ember/component';
import { observer, computed } from '@ember/object';
import { keys, values } from 'lodash-es';

export default Component.extend({

  address: {
    venue   : '',
    line    : '',
    city    : '',
    state   : '',
    zipCode : '',
    country : ''
  },

  suggestions: [],

  combinedAddress: computed('address.{venue,line,city,state,zipCode,country}', function() {
    return values(this.address).join(' ').trim();
  }),

  searchableAddress: computed('address.{city}', function() {
    return this.address.city;
  }),

  placeNameChanger: observer('combinedAddress', 'searchableAddress', function() {
    this.setProperties(
      { 'placeName'      : this.combinedAddress,
        'searchableName' : this.searchableAddress
      }
    );

  }),

  actions: {
    showAddressView(show = true) {
      this.set('addressViewIsShown', show);
      if (!show) {
        keys(this.address).forEach(key => {
          this.set(`address.${key}`, '');
        });
        this.setProperties({
          zoom : 1,
          lat  : 0,
          lng  : 0
        });
      }
    },
    setAutocomplete(place) {
      this.set('placeName', place);
    },
    async suggestionsTrigger(location) {
      const response = this.loader.load(`https://nominatim.openstreetmap.org/search?q=${location}&format=jsonv2&addressdetails=1`, { isExternal: true });
      const [cords] = await Promise.all([response]);
      this.set('suggestions', cords);
    },
    onLocationChangeHandler(lat, lng) {
      this.setProperties({
        zoom: 17,
        lat,
        lng
      });
    },
    async updateLocation(e) {
      const location = e.target.getLatLng();
      const response = this.loader.load(`https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=jsonv2`, { isExternal: true });
      const [cords] = await Promise.all([response]);
      const state = cords?.address?.state ? cords.address.state : cords?.address?.county;
      const city = cords?.address.city ? cords.address.city : cords?.address?.state_district;
      if (cords.address) {
        this.set('address.country', cords?.address?.country);
        this.set('address.state', state);
        this.set('address.venue', cords?.display_name);
        this.set('address.city', city);
      }
    },
    placeChanged(place) {
      const addressComponents = place.address_components;
      addressComponents.forEach(component => {
        const [type] = component.types;
        const value = component.long_name;
        switch (type) {
          case 'country':
            this.set('address.country', value);
            break;
          case 'administrative_area_level_1':
            this.set('address.state', value);
            break;
          case 'administrative_area_level_2':
            this.set('address.city', value);
            break;
          case 'route':
            this.set('address.line', `${this.address.line}${value} `);
            break;
          case 'sublocality_level_2':
            this.set('address.line', `${this.address.line}${value} `);
            break;
          case 'sublocality_level_1':
            this.set('address.line', `${this.address.line}${value} `);
            break;
        }
      });
      this.send('showAddressView');
    }
  }
});
