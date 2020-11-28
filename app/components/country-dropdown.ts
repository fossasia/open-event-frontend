import Component from '@glimmer/component';
import { orderBy, filter } from 'lodash-es';
import { paymentCountries } from 'open-event-frontend/utils/dictionary/payment';
import { countries, Country } from 'open-event-frontend/utils/dictionary/demography';

export default class CountryDropdown extends Component {
  get countries(): Country[] {
    return orderBy(countries, 'name');
  }

  get paymentCountries(): Country[] {
    return orderBy(filter(countries, country => paymentCountries.includes(country.code)), 'name');
  }
}
