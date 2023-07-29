import Component from '@ember/component';
import { orderBy } from 'lodash-es';
import { badgeSize, badgeOrientation } from 'open-event-frontend/utils/dictionary/badge-field';
import FormMixin from 'open-event-frontend/mixins/form';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { computed } from '@ember/object';

export default Component.extend(FormMixin, EventWizardMixin, {
  init() {
    this._super(...arguments);
  },
  get badgeSize() {
    return orderBy(badgeSize, 'position');
  },

  get badgeOrientation() {
    return orderBy(badgeOrientation, 'position');
  },
  getAspectRatio: computed('badgeSizeCrop.lineHeight', 'badgeSizeCrop.height', function() {
    return {
      width  : this.badgeSizeCrop.lineHeight * 96 / 150,
      height : this.badgeSizeCrop.height * 96 / 150
    };
  }),
  actions: {
    onChangeBadgeColor() {
      this.set('data.badgeImageURL', null);
      this.set('data.selectedImage', null);
      this.set('data.imageUrl', null);
    }
  }
});
