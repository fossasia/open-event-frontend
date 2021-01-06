import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { languages } from 'open-event-frontend/utils/dictionary/languages';
import { orderBy } from 'lodash-es';

export default Component.extend(FormMixin, {
  languages: orderBy(languages, 'name')
});
