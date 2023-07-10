import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { sortBy, union } from 'lodash-es';

export default Component.extend(FormMixin, EventWizardMixin, {
  currentSelected     : [],
  trackedfieldEditing : [],
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

  getEditingField: computed('fieldEditing', function() {
    return this.fieldEditing;
  }),

  actions: {
    removeField(field) {
      field.deleteRecord();
    },
    setEditingField(name) {
      this.set('fieldEditing', name);
    }
  }
});

