import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { sortBy } from 'lodash-es';
import { v4 } from 'ember-uuid';
import { A } from '@ember/array';

export default Component.extend(FormMixin, EventWizardMixin, {
  tickets        : [],
  excludeTickets : A(),
  isOldFormMode  : false,
  isInit         : false,

  init() {
    this._super(...arguments);
    this.prepareCustomFormsForShow();
  },

  prepareCustomFormsForShow() {
    const { tickets, customForms, forms } = this.data;
    if (this.isInit || forms.length) {return}
    this.isInit = true;
    const noForm = tickets.filter(_ticket => _ticket.formID).length === 0;
    if (noForm) {
      const _formID = v4();
      const _fields = customForms?.filter(field => {
        if (!field.isFixed && !field.isDeleted) {
          field.formID = _formID;
          return true;
        }
        return false;
      });
      if (_fields.length > 0) {
        tickets.forEach(_ticket => {
          _ticket.formID = _formID;
          this.excludeTickets.pushObject(_ticket);
        });
        forms.pushObject(this.store.createRecord('custom-form-ticket', {
          formID         : _formID,
          customForms    : _fields,
          ticketsDetails : tickets
        }));
      }
    } else {
      const _forms = {};
      tickets.forEach(ticket => {
        const { formID } = ticket;
        if (formID) {
          if (_forms[formID]) {
            _forms[formID].ticketsDetails.pushObject(ticket);
          } else {
            _forms[formID] = {
              ticketsDetails: [ticket]
            };
          }
          this.excludeTickets.pushObject(ticket);
        }
      });
      Object.keys(_forms).forEach(_id => {
        const selectedTicket = _forms[_id].ticketsDetails;
        forms.pushObject({
          formID         : _id,
          ticketsDetails : selectedTicket,
          customForms    : customForms.filter(_field => _field.formID === _id)
        });
      });
    }
  },

  prepareCustomFormsForSave() {
    this.set('loading', true);
    this.data.forms.forEach(_form => {
      const { formID, customForms, ticketsDetails } = _form;
      customForms.forEach(field => {
        if (!field.isDeleted) {
          field.formID = formID;
        }
        if (!field.id) {
          this.data.customForms.pushObject(field);
        }
      });

      ticketsDetails.forEach(ticket => {
        ticket.formID = formID;
      });
    });
  },

  fixedFields: computed('data.customForms.@each', function() {
    return this.data.customForms?.filter(field => field.isFixed);
  }),

  selectableTickets: computed('excludeTickets.@each', 'form.@each', function() {
    return this.data.tickets.filter(ticket => !this.excludeTickets.includes(ticket));
  }),

  editableFields: computed('data.customForms.@each', function() {
    const filteredFields = this.data.customForms?.filter(field => !field.isFixed);
    const fields = sortBy(filteredFields, ['isComplex', 'name']);
    return sortBy(fields, ['position']);
  }),

  revertChanges: observer('data.event.isTicketFormEnabled', function() {
    if (!this.data.event.isTicketFormEnabled) {
      this.editableFields.forEach(field => field.set('isRequired', false));
    }
  }),

  showEditColumn: computed('editableFields.@each', function() {
    return this.editableFields?.some(field => field.isComplex);
  }),


  actions: {
    removeField(field) {
      field.deleteRecord();
    },
    addMoreForm(ticketsDetails = []) {
      const _formID =  v4();
      this.data.forms.pushObject(this.store.createRecord('custom-form-ticket', {
        formID      : _formID,
        customForms : this.getCustomAttendeeForm(this.data.event, _formID),
        ticketsDetails
      }));
    },

    onFormUpdateTicket(changedData) {
      const { added, changed, formID } = changedData;
      changed.forEach(ticket => {
        ticket.formID = added ? formID : '';
      });
      if (added) {
        this.excludeTickets.pushObjects(changed);
      } else {
        this.excludeTickets.removeObjects(changed);
      }
    },
    saveDraft() {
      this.prepareCustomFormsForSave();
      this._super();
    },
    saveForm() {
      this.prepareCustomFormsForSave();
      this._super();
    },
    move(direction) {
      this.prepareCustomFormsForSave();
      this._super(direction);
    },
    onRemoveForm(_id) {
      const deleteForm = this.data.forms.find(_form => _form.formID === _id);
      if (deleteForm) {
        const { ticketsDetails, customForms } = deleteForm;
        ticketsDetails.forEach(ticket => {
          ticket.formID = '';
        });
        customForms.forEach(field => {
          field.deleteRecord();
        });
        this.excludeTickets.removeObjects(deleteForm.ticketsDetails);
        this.data.forms.removeObject(deleteForm);
      }
    }
  }
});

