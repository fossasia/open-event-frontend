import Component from '@glimmer/component';
import { orderBy, filter } from 'lodash-es';
import { paymentCountries } from 'open-event-frontend/utils/dictionary/payment';
import { countries } from 'open-event-frontend/utils/dictionary/demography';

export default class CountryDropdown extends Component {
  get countries() {
    return orderBy(countries, 'name');
  }

  get paymentCountries() {
    return orderBy(filter(countries, country => paymentCountries.includes(country.code)), 'name');
  }
}
