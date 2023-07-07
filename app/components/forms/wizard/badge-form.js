import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { sortBy, union } from 'lodash-es';
import { badgeCustomFields } from 'open-event-frontend/utils/dictionary/badge-custom-fields';

export default Component.extend(FormMixin, EventWizardMixin, {
  currentSelected   : [],
  badgeHeight       : [],
  badgeLineHeight   : [],
  ignoreCustomField : [],
  isExpandedBadge   : true,

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

  includeCustomField: computed('ignoreCustomField.@each', function() {
    return badgeCustomFields.filter(item => !this.ignoreCustomField.includes(item.name));
  }),

  ticketNames: computed('data.ticketsDetails.@each', function() {
    let ticketNames = '';
    this.data.ticketsDetails.forEach(ticket => {
      if (ticketNames) {
        ticketNames += ', ' + ticket.name;
      } else {
        ticketNames = ticket.name;
      }
    });
    return ticketNames.trim();
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

  disableAddBadgeField: computed('data.badgeFields.@each.isDeleted', function() {
    return this.data.badgeFields?.filter(field => !field.isDeleted).length === badgeCustomFields.length;
  }),

  removeBadgeField(badgeField) {
    badgeField.isDeleted = true;
    this.ignoreCustomField.removeObject(badgeField.customField);
  },

  onSelectedLanguage(old_code, new_code) {
    if (old_code) {
      this.ignoreCustomField.removeObject(old_code);
    }
    if (new_code) {
      this.ignoreCustomField.pushObject(new_code);
    }
  },

  actions: {
    removeField(field) {
      field.deleteRecord();
    },
    mutateBadgeSize(value) {
      if (value.name === '4" x 3"') {
        this.badgeHeight = value.height;
        this.badgeLineHeight = value.lineHeight;
      } else if (value.name === '3.5" x 5"') {
        this.badgeHeight = value.height;
        this.badgeLineHeight = value.lineHeight;
      } else {
        this.badgeHeight = value.height;
        this.badgeLineHeight = value.lineHeight;
      }
      this.set('badgeSize', value);
    },
    addBadgeField(badgeCustomFields = []) {
      this.data.badgeFields.pushObject(this.store.createRecord('badge-field-form', {
        badgeID   : this.data.badgeID,
        isDeleted : false,
        badgeCustomFields
      }));
    },
    onChildChangeCustomField(old_code, new_code) {
      this.onSelectedLanguage(old_code, new_code);
    },
    toggleBadge() {
      if (!this.isExpandedBadge) {
        this.set('isExpandedBadge', true);
      } else {
        this.set('isExpandedBadge', false);
      }
    }
  }
});

