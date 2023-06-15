import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { sortBy } from 'lodash-es';
import Ember from 'ember';
import { exclude } from 'query-string';
import { v4 } from 'ember-uuid';

export default Component.extend(FormMixin, EventWizardMixin, {
  // form: Ember.A([]),
  tickets: [],

  

  excludeTickets: Ember.A([]),
  init(){
    this._super(...arguments);
    // console.log("=====================",this.data.customFormTickets.toArray())
    const debug = false
    if(this.data?.forms?.length == 0){
    if(debug){
      this.prepareCustomFormsForShow1();
    } else {
      this.prepareCustomFormsForShow();
    }
      
      
    }
  },
  prepareCustomFormsForShow1(){
    

    // this.data.forms.pushObject(this.store.createRecord('custom-form-ticket', {
    //   formID          : v4(),
    //   customForms     : [],
    //   ticketsDetails  : []
    // }))


    console.log("==================== 2")

  },
  prepareCustomFormsForShow(){
    const _forms = {}

    this.data.tickets.forEach(ticket => {
      const { formID } = ticket
      if(formID){
        if(_forms[formID]){
          _forms[formID].ticketsDetails.pushObject(ticket)
        } else {
          _forms[formID] = {
            ticketsDetails: [ticket]
          }
        }
      }
    })

    Object.keys(_forms).forEach(_id => {

      const selectedTicket = _forms[_id].ticketsDetails;
      this.excludeTickets.pushObjects(selectedTicket);
      this.data.forms.pushObject({
        formID: _id,
        ticketsDetails: selectedTicket,
        customForms: this.data.customForms.filter(_field => _field.formID == _id)
      })
    })

  },
  prepareCustomFormsForSave(){
    this.data.forms.forEach(_form => {
      const {formID, customForms,ticketsDetails} = _form
      customForms.forEach(field => {
        if(!field.isDeleted){
          field.formID = formID
          
        }
        if(!field.id){
          this.data.customForms.pushObject(field)
        }
        
      })
      
      ticketsDetails.forEach(ticket => {
        ticket.formID = formID
      })
    })
  },
  fixedFields: computed('data.customForms.@each', function() {
    
    return this.data.customForms?.filter(field => field.isFixed);
  }),

  selectableTickets: computed('excludeTickets.@each','form.@each', function(){
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
    addMoreForm(){
      this.data.forms.pushObject(this.store.createRecord('custom-form-ticket', {
        formID          : v4(),
        customForms     : [],
        ticketsDetails  : []
      }))
    },

    updateField(changedData){
      const { added, changed, formID} = changedData;
      changed.forEach(ticket => {
        ticket.formID = added ? formID : "";
      })
      if (added){
        this.excludeTickets.pushObjects(changed);
      } else {
        this.excludeTickets.removeObjects(changed);
      }
    },
    saveDraft(){
      this.prepareCustomFormsForSave();
      this._super();
    },
    saveForm(){
      this.prepareCustomFormsForSave();
      this._super();
    },
    move(direction){
      this.prepareCustomFormsForSave();
      this._super(direction);
    },
    removeForm(_id){

      const deleteForm = this.data.forms.find(_form => _form.formID == _id)
      if(deleteForm){

        const { ticketsDetails } = deleteForm
        ticketsDetails.forEach(ticket => {
          ticket.formID = ""
        })

        this.excludeTickets.removeObjects(deleteForm.ticketsDetails);
        this.data.forms.removeObject(deleteForm)
      }
    }
  }
});

