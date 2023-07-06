import Component from '@ember/component';
import { computed } from '@ember/object';
import { orderBy } from 'lodash-es';
import { inject as service } from '@ember/service';
import FormMixin from 'open-event-frontend/mixins/form';
import { countries } from 'open-event-frontend/utils/dictionary/demography';
import { booleanTextType } from 'open-event-frontend/utils/dictionary/boolean_text_type';

export default Component.extend(FormMixin, {
  router             : service(),
  autoScrollToErrors : false,
  isExpanded         : true,
  countries          : orderBy(countries, 'name'),
  booleanTextType    : orderBy(booleanTextType, 'position'),
  holders            : computed('data.attendees', 'buyer', function() {
    return this.data.attendees;
  }),

  actions: {
    toggleSetting() {
      if (!this.isExpanded) {
        this.set('isExpanded', true);
      } else {
        this.set('isExpanded', false);
      }
    },
    removeForm() {

      if (this.removeBadgeField) {
        this.removeBadgeField(this.data);
      }
    }
  }
});
