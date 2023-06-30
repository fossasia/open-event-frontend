import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { countries } from 'open-event-frontend/utils/dictionary/demography';
import { genders } from 'open-event-frontend/utils/dictionary/genders';
import { orderBy } from 'lodash-es';

export default Component.extend(FormMixin, {
  countries : orderBy(countries, 'name'),
  genders   : orderBy(genders, 'position')
});
