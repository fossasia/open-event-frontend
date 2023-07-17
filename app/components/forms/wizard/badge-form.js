import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { sortBy, union } from 'lodash-es';
import { badgeSize } from 'open-event-frontend/utils/dictionary/badge-field';
import { htmlSafe } from '@ember/template';
import { badgeCustomFields } from 'open-event-frontend/utils/dictionary/badge-custom-fields';
// import QRCode from 'qrcode';

export default Component.extend(FormMixin, EventWizardMixin, {
  currentSelected   : [],
  ignoreCustomField : [],
  isExpandedBadge   : true,
  init() {
    this._super(...arguments);
    this.removeBadgeField = this.removeBadgeField.bind(this);
    this.currentSelected = this.selectedTicket;
    this.badgeForms = this.data;
    this.ignoreCustomField = [];
  },

  ticketsEnable: computed('tickets', 'selectedTicket.@each', function() {
    return union(this.tickets || [], this.selectedTicket || []);
  }),

  fixedFields: computed('data.customForms.@each', function() {
    return this.data.customForms?.filter(field => field.isFixed);
  }),

  badgeFields: computed('data.badgeFields.@each.is_deleted', function() {
    return this.data.badgeFields?.filter(field => !field.is_deleted);
  }),

  includeCustomField: computed('ignoreCustomField.@each', 'selectedTicket.@each', 'data.badgeFields.@each.is_deleted', 'data.badgeFields.@each', function() {
    return this.customFormsValid.filter(item => !this.ignoreCustomField.includes(item.name) && !this.data.badgeFields.map(field => !field.is_deleted && field.custom_field).includes(item.name));
  }),

  customFormsValid: computed('selectedTicket.@each', 'data.badgeFields.@each', function() {
    const formIds = this.selectedTicket.map(item => item.formID);
    const validForms = this.customForms.filter(form => (formIds.includes(form.formID) && form.isIncluded) || form.isFixed);
    validForms.push({ 'name': 'QR', 'field_identifier': 'qr' });
    return union(sortBy(validForms));
  }),

  qrFields: computed('selectedTicket.@each', 'data.badgeFields.@each', function() {
    // return sortBy(this.data.badgeFields.filter(field => !field.is_deleted && field.custom_field !== 'QR').map(field => field.custom_field));
    const formIds = this.selectedTicket.map(item => item.formID);
    const validForms = this.customForms.filter(form => (formIds.includes(form.formID) && form.isIncluded) || form.isFixed);
    return union(sortBy(validForms));
  }),

  ticketNames: computed('selectedTicket.@each', function() {
    let ticketNames = '';
    this.selectedTicket.forEach(ticket => {
      if (ticketNames) {
        ticketNames += ', ' + ticket.name;
      } else {
        ticketNames = ticket.name;
      }
    });
    return ticketNames.trim();
  }),

  selectChanges: observer('selectedTicket.@each', function() {
    const ticketsDetails = this.selectedTicket;
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
    const filteredFields = this.customForms?.filter(field => !field.isFixed);
    const fields = sortBy(filteredFields, ['isComplex', 'name']);
    return sortBy(fields, ['position']);
  }),

  revertChanges: observer('event.isBadgesEnabled', function() {
    if (!this.event.isBadgesEnabled) {
      this.editableFields.forEach(field => field.set('isRequired', false));
    }
  }),

  showEditColumn: computed('editableFields.@each', function() {
    return this.editableFields?.some(field => field.isComplex);
  }),

  disableAddBadgeField: computed('badgeForms.badgeFields.@each.is_deleted', function() {
    return this.badgeForms.badgeFields?.filter(field => !field.is_deleted).length - 1 === this.customForms?.filter(field => field.isIncluded).length;
  }),

  removeBadgeField(badgeField) {
    this.ignoreCustomField.removeObject(badgeField.custom_field);
  },

  onSelectedCustomField(old_code, new_code) {
    if (old_code) {
      this.ignoreCustomField.removeObject(old_code);
    }
    if (new_code) {
      this.ignoreCustomField.pushObject(new_code);
    }
  },

  getsampleData: computed('sampleData', function() {
    return {
      name         : 'Barack Obama',
      organisation : 'US',
      position     : 'President'
    };
  }),

  getBadgeSize: computed('badgeForms.badgeSize', 'badgeForms.badgeOrientation', function() {
    let height = 4;
    let lineHeight = 3;
    const selectedSize = badgeSize.filter(badge => badge.name === this.badgeForms.badgeSize)[0];
    if (selectedSize) {
      [height, lineHeight] = [selectedSize.height, selectedSize.lineHeight];
    }
    if (this.badgeForms.badgeOrientation === 'Landscape') {
      [height, lineHeight] = [lineHeight, height];
    }

    return {
      height,
      lineHeight };
  }),

  getBadgeImgOrColor: computed('badgeForms.badgeColor', 'badgeForms.badgeImageURL', function() {
    let style = '';
    if (this.badgeForms.badgeColor) {
      style += `background-color: ${this.badgeForms.badgeColor}`;
    }
    if (this.badgeForms.badgeImageURL) {
      style += `background-image: url(${this.badgeForms.badgeImageURL}); background-size: cover;`;
    }
    return htmlSafe(style);
  }),

  // generateQRCode(element) {
  //   const text = 'Hello world'; // get the text to encode from the component argument or use a default value
  //   const test = document.getElementById('badge_qr');
  //   QRCode.toCanvas(test, text, function(error) { // use the qrcode method to create a canvas element with the QR code
  //     if (error) {
  //       console.error(error); // handle any errors
  //     } else {
  //       console.log('QR code generated!'); // log success
  //     }
  //   });
  // },

  actions: {
    removeField(field) {
      field.deleteRecord();
    },
    addBadgeField() {
      this.badgeForms.badgeFields.pushObject(this.store.createRecord('badge-field-form', {
        badge_id   : this.data.badgeID,
        is_deleted : false,
        badgeCustomFields
      }));
    },
    mutateBadgeSize(value) {
      badgeSize.forEach(badge => {
        if (badge.name === value) {(this.badgeForms.badgeSize = badge.name)}
      });
    },
    onChildChangeCustomField(old_code, new_code) {
      this.onSelectedCustomField(old_code, new_code);
    },
    toggleBadge() {
      if (!this.isExpandedBadge) {
        this.set('isExpandedBadge', true);
      } else {
        this.set('isExpandedBadge', false);
      }
    },
    mutatetickets(ticket) {
      this.selectedTicket.pushObject(ticket);
    }
  }
});
