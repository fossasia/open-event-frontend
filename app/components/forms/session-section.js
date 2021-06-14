import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { languages } from 'open-event-frontend/utils/dictionary/languages';
import { orderBy } from 'lodash-es';
import { levels } from 'open-event-frontend/utils/dictionary/levels';

export default Component.extend(FormMixin, {
  languages : orderBy(languages, 'name'),
  levels    : orderBy(levels, 'position')
});
