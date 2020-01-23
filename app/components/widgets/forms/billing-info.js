import { countries } from 'open-event-frontend/utils/dictionary/demography'; // eslint-disable-line no-console
import Component from '@ember/component';
import { computed } from '@ember/object';
import { orderBy } from 'lodash-es';

export default Component.extend({
  countries: computed(function() {
    return orderBy(countries, 'name');
  })
});