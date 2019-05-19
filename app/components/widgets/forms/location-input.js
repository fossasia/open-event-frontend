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

  combinedAddress: computed('address.{venue,line,city,state,zipCode,country}', function() {
    return values(this.get('address')).join(' ').trim();
  }),

  placeNameChanger: observer('combinedAddress', function() {
    this.set('placeName', this.get('combinedAddress'));
  }),

  actions: {
    showAddressView(show = true) {
      this.set('addressViewIsShown', show);
      if (!show) {
        keys(this.get('address')).forEach(key => {
          this.set(`address.${key}`, '');
        });
        this.setProperties({
          zoom : 1,
          lat  : 0,
          lng  : 0
        });
      }
    },
    onLocationChangeHandler(lat, lng) {
      this.setProperties({
        zoom: 17,
        lat,
        lng
      });
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
            this.set('address.line', `${this.get('address.line')}${value} `);
            break;
          case 'sublocality_level_2':
            this.set('address.line', `${this.get('address.line')}${value} `);
            break;
          case 'sublocality_level_1':
            this.set('address.line', `${this.get('address.line')}${value} `);
            break;
        }
      });
      this.send('showAddressView');
    }
  }
});
