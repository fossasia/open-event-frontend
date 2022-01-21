import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { groupBy } from 'lodash-es';
import { or } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';

@classic
export default class AttendeeList extends Component {

  @tracked editFields=false;

  @computed('data.user')
  get buyer() {
    return this.data.user;
  }

  @computed('data.attendees')
  get holders() {
    return this.data.attendees;
  }

  @or('event.isBillingInfoMandatory', 'data.isBillingEnabled')
  showBillingInfo;

  @computed('fields.@each.form')
  get allFields() {
    return groupBy(this.fields.toArray(), field => field.form);
  }

  @action
  toggleEditFields() {
    this.editFields = !this.editFields;
  }

  @action
  async saveHolder(holder) {
    try {
      await holder.save();
      await this.data.save();
    } catch (error) {
      console.warn(error);
    } finally {
      this.editFields = !this.editFields;
    }
  }

  @action
  async downloadTicketForAttendee(eventName, orderId, attendeeId) {
    try {
      this.loader.downloadFile(`/orders/attendees/${attendeeId}.pdf`)
        .then(res => {
          const anchor = document.createElement('a');
          anchor.style.display = 'none';
          anchor.href = URL.createObjectURL(new Blob([res], { type: 'application/pdf' }));
          anchor.download = `${eventName}-Ticket-${orderId}-${attendeeId}.pdf`;
          document.body.appendChild(anchor);
          anchor.click();
          this.notify.success(this.l10n.t('Here is your ticket'),
            {
              id: 'tick_pdf'
            });
          document.body.removeChild(anchor);
        })
        .catch(e => {
          console.error('Error while downloading tickets', e);
        });
    } catch (error) {
      console.warn(error);
    }
  }
}
