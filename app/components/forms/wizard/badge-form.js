import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { sortBy, union } from 'lodash-es';
import { badgeSize } from 'open-event-frontend/utils/dictionary/badge-image-size';
import { htmlSafe } from '@ember/template';
import tinycolor from 'tinycolor2';

export default Component.extend(FormMixin, EventWizardMixin, {
  currentSelected: [],

  init() {
    this._super(...arguments);
    this.currentSelected = this.data.ticketsDetails;
  },

  ticketsEnable: computed('tickets', 'ticketsDetails', function() {
    return union(this.tickets || [], this.data.ticketsDetails || []);
  }),

  fixedFields: computed('data.customForms.@each', function() {
    return this.data.customForms?.filter(field => field.isFixed);
  }),

  badgeFields: computed('data.badgeFields.@each.isDeleted', function() {
    return this.data.badgeFields?.filter(field => !field.isDeleted);
  }),

  selectChanges: observer('data.ticketsDetails', function() {
    const { ticketsDetails } = this.data;
    const { currentSelected } = this;

    const added = currentSelected.length < ticketsDetails.length;
    let changed = [];
    if (added) {
      changed = ticketsDetails.filter(item => !currentSelected.includes(item));
    } else {
      changed = currentSelected.filter(item => !ticketsDetails.includes(item));
    }
    this.currentSelected = ticketsDetails;
    this.get('onFormUpdateTicket')({
      added,
      changed,
      formID: this.id
    });

  }),

  editableFields: computed('data.customForms.@each', function() {
    const filteredFields = this.data.customForms?.filter(field => !field.isFixed);
    const fields = sortBy(filteredFields, ['isComplex', 'name']);
    return sortBy(fields, ['position']);
  }),

  revertChanges: observer('data.event.isTicketFormEnabled', function() {
    if (!this.event.isTicketFormEnabled) {
      this.editableFields.forEach(field => field.set('isRequired', false));
    }
  }),

  showEditColumn: computed('editableFields.@each', function() {
    return this.editableFields?.some(field => field.isComplex);
  }),

  removeBadgeField(badgeField) {
    badgeField.isDeleted = true;
  },

  getsampleData: computed('sampleData', function() {
    return {
      name         : 'Barack Obama',
      organisation : 'US',
      position     : 'President'
    };
  }),

  getBadgeSize: computed('badgeSize', 'badgeOrientation', function() {
    let height = 4;
    let lineHeight = 3;
    if (this.badgeSize) {
      [height, lineHeight] = [this.badgeSize.height, this.badgeSize.lineHeight];
    }
    if (this.badgeOrientation === 'Landscape') {
      [height, lineHeight] = [lineHeight, height];
    }

    return {
      height,
      lineHeight };
  }),

  getBadgeStyle: computed('badgeSize', 'badgeOrientation', 'badgeColor', 'data.badgeImageURL', function() {
    const headerStyle = 'padding: 0; width: calc(' + this.getBadgeSize.lineHeight + 'in); background-image: url(' + this.data.badgeImageURL +')';
    const bodyStyle = 'color: #000000; background-size: cover; height: calc(' + this.getBadgeSize.height + 'in); background-color: ' + this.badgeColor + ';';
    return {
      headerStyle : htmlSafe(headerStyle),
      bodyStyle   : htmlSafe(bodyStyle)
    };
  }),

  // styleHelper: computed('data.badgeFields.@each.fontSize', 'data.badgeFields.@each.textAlignment', 'data.badgeFields.@each.textType', function() {
  //   const fieldStyle = 'font-size : '  + '; overflow: hidden; word-wrap: break-word;';
  //   return htmlSafe(fieldStyle);
  // }),

  actions: {
    removeField(field) {
      field.deleteRecord();
    },
    addBadgeField() {
      this.data.badgeFields.pushObject(this.store.createRecord('badge-field-form', {
        badgeID   : this.data.badgeID,
        isDeleted : false
      }));
    },
    mutateBadgeSize(value) {
      badgeSize.forEach(badge => {
        if (badge.name === value) {this.set('badgeSize', badge)}
      });
      this.data.badgeSize = this.badgeSize;
    },
    mutateBadgeOrientation(value) {
      this.set('badgeOrientation', value);
      this.data.badgeOrientation = value;
    },
    mutateBadgeColor(color) {
      const colorCode = tinycolor(color.target.value);
      this.set('badgeColor', colorCode.toHexString());
      this.data.badgeColor = this.badgeColor;
    }
  }
});
