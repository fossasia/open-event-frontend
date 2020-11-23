import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import { countries } from 'open-event-frontend/utils/dictionary/demography';
import { languages } from 'open-event-frontend/utils/dictionary/languages';
import { genders } from 'open-event-frontend/utils/dictionary/genders';

export default Component.extend(FormMixin, {
  countries: orderBy(countries, 'name'),
  languages: orderBy(languages, 'name'),
  genders: orderBy(genders, 'name')
});
