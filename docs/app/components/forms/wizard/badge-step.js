import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
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
    const { tickets, badgeForms, badges } = this.data;
    if (this.isInit || badges.length) {return}
    this.isInit = true;
    const noForm = tickets.filter(_ticket => _ticket.badgeID).length === 0;
    if (noForm) {
      const _badgeID = v4();
      const _fields = badgeForms?.filter(field => {
        if (!field.isDeleted) {
          field.badgeID = _badgeID;
          return true;
        }
        return false;
      });
      if (_fields.length > 0) {
        tickets.forEach(_ticket => {
          _ticket.badgeID = _badgeID;
          this.excludeTickets.pushObject(_ticket);
        });
        _fields.forEach(form => {
          const badgeFields = [];
          form.badgeFields.forEach(field => {
            if (!field.is_deleted) {
              badgeFields.pushObject(this.store.createRecord('badge-field-form', {
                badge_field_id   : field.id,
                badge_id         : field.badge_id,
                field_identifier : field.field_identifier,
                custom_field     : field.custom_field,
                sample_text      : field.sample_text,
                font_size        : field.font_size,
                font_name        : field.font_name,
                font_color       : field.font_color,
                text_rotation    : field.text_rotation,
                margin_top       : field.margin_top,
                margin_bottom    : field.margin_bottom,
                margin_left      : field.margin_left,
                margin_right     : field.margin_right,
                font_weight      : field.font_weight,
                text_alignment   : field.text_alignment,
                text_type        : field.text_type,
                is_deleted       : field.is_deleted,
                qr_custom_field  : field.qr_custom_field
              }));
              field = null;
            }
          });
          form.badgeFields = badgeFields;
        });
        badges.pushObject(this.store.createRecord('badge', {
          badgeID        : _badgeID,
          badgeForms     : _fields,
          ticketsDetails : this.excludeTickets
        }));
      }
    } else {
      const _badges = {};
      tickets.forEach(ticket => {
        const { badgeID } = ticket;
        if (badgeID) {
          if (_badges[badgeID]) {
            _badges[badgeID].ticketsDetails.pushObject(ticket);
          } else {
            _badges[badgeID] = {
              ticketsDetails: [ticket]
            };
          }
          this.excludeTickets.pushObject(ticket);
        }
      });

      Object.keys(_badges).forEach(_id => {
        const selectedTicket = _badges[_id].ticketsDetails;
        badges.pushObject({
          badgeID        : _id,
          ticketsDetails : selectedTicket,
          badgeForms     : badgeForms.filter(_field => _field.badgeID === _id)
        });
      });
      badges.forEach(badge => {
        badge.badgeForms.forEach(form => {
          const badgeFields = [];
          form.badgeFields.forEach(field => {
            if (!field.is_deleted) {
              badgeFields.pushObject(this.store.createRecord('badge-field-form', {
                badge_field_id    : field.id,
                badge_id          : field.badge_id,
                field_identifier  : field.field_identifier,
                custom_field      : field.custom_field,
                sample_text       : field.sample_text,
                font_size         : field.font_size,
                font_name         : field.font_name,
                font_color        : field.font_color,
                text_rotation     : field.text_rotation,
                margin_top        : field.margin_top,
                margin_bottom     : field.margin_bottom,
                margin_left       : field.margin_left,
                margin_right      : field.margin_right,
                font_weight       : field.font_weight,
                text_alignment    : field.text_alignment,
                text_type         : field.text_type,
                is_deleted        : field.is_deleted,
                qr_custom_field   : field.qr_custom_field,
                is_field_expanded : field.is_field_expanded
              }));
              field = null;
            }
          });
          form.badgeFields = badgeFields;
        });
      });
    }
  },

  prepareCustomFormsForSave() {
    this.set('loading', true);
    this.data.badges.forEach(_badge => {
      const { badgeID, badgeForms, ticketsDetails } = _badge;
      badgeForms.forEach(field => {
        if (!field.isDeleted) {
          field.badgeID = badgeID;
        }
        if (!field.id) {
          this.data.badgeForms.pushObject(field);
        }
      });
      ticketsDetails.forEach(ticket => {
        ticket.badgeID = badgeID;
      });
    });
  },

  selectableTickets: computed('excludeTickets.@each', 'badge.@each', function() {
    return this.data.tickets.filter(ticket => !this.excludeTickets.includes(ticket));
  }),

  revertChanges: observer('data.event.isBadgesEnabled', function() {
    if (!this.data.event.isBadgesEnabled) {
      this.editableFields.forEach(field => field.set('isRequired', false));
    }
  }),

  showEditColumn: computed('editableFields.@each', function() {
    return this.editableFields?.some(field => field.isComplex);
  }),

  getBadgeForm(parent, _badgeID, ticketsDetails, badgeForms = [], badgeFields = []) {
    return this.store.createRecord('badge-form', {
      badgeID : _badgeID,
      event   : parent,
      ticketsDetails,
      badgeForms,
      badgeFields
    });
  },

  actions: {
    removeField(field) {
      field.deleteRecord();
    },
    addBadge(ticketsDetails = []) {
      const _badgeID =  v4();
      this.data.badges.pushObject(this.store.createRecord('badge', {
        badgeID    : _badgeID,
        ticketsDetails,
        badgeForms : [this.getBadgeForm(this.data.event, _badgeID, ticketsDetails)]
      }));
    },

    toggleBadges() {
      if (!this.data.event.isBadgesEnabled) {
        this.set('data.event.isBadgesEnabled', true);
      } else {
        this.set('data.event.isBadgesEnabled', false);
        this.data.badges.clear();
      }
    },

    onFormUpdateTicket(changedData) {
      const { added, changed, formID } = changedData;
      changed.forEach(ticket => {
        ticket.badgeID = added ? formID : '';
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
    handleKeyDown(event) {
      if ((event.key === 'Enter' || event.keyCode === 13)) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    onRemoveForm(_id) {
      const deleteBadge = this.data.badges.find(_badge => _badge.badgeID === _id);
      if (deleteBadge) {
        const { ticketsDetails, badgeForms } = deleteBadge;
        ticketsDetails.forEach(ticket => {
          ticket.badgeID = '';
        });
        badgeForms.forEach(field => {
          field.deleteRecord();
        });
        this.excludeTickets.removeObjects(deleteBadge.ticketsDetails);
        this.data.badges.removeObject(deleteBadge);
      }
    },
    async onPrintPreview(badgeID) {
      try {
        const badge = this.data.badges.find(_badge => _badge.badgeID === badgeID);
        const config = {
          'headers': {
            'Cache-Control': 'no-cache'
          }
        };
        const data = {
          badgeForms: badge.badgeForms
        };
        const result = await this.loader.downloadFileWithPost('/badge-forms/preview-badge-pdf', data, config);
        const anchor = document.createElement('a');
        anchor.style.display = 'none';
        anchor.href = URL.createObjectURL(new Blob([result], { type: 'application/pdf' }));
        anchor.download = `${badgeID}.pdf`;
        document.body.appendChild(anchor);
        anchor.click();
        this.notify.success(this.l10n.t('Here is your Badge Preview'),
          {
            id: 'badge_preview'
          });
        document.body.removeChild(anchor);
      } catch (e) {
        this.notify.error(e, {
          id: 'err_down'
        });
      }
    }
  }
});
