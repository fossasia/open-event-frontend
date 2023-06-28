import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { groupBy } from 'lodash-es';
import { or } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import { languageForms } from 'open-event-frontend/utils/dictionary/language-form';

@classic
export default class AttendeeList extends Component {

  @tracked editFields=false;

  @computed('data.user')
  get buyer() {
    return this.data.user;
  }

  @computed('data.attendees')
  get holders() {
    this.data.attendees.forEach(attendee => {
      if (attendee.language_form_1) {
        this.languageFormMapCodeToName(attendee, 'language_form_1');
      }
      if (attendee.language_form_2) {
        this.languageFormMapCodeToName(attendee, 'language_form_2');
      }
    });
    return this.data.attendees;
  }

  languageFormMapCodeToName(attendee, key) {
    const languageFormMap = [];
    const languageFormList = attendee[key].split(',');
    languageForms.forEach(languageForm => {
      languageFormList.forEach(item => {
        if (item === languageForm.code) {
          languageFormMap.push(languageForm.name);
        }
      });
    });
    return attendee.set(key.concat('_name_mapping'), languageFormMap.map(select => select).join(', '));
  }

  @or('event.isBillingInfoMandatory', 'data.isBillingEnabled')
  showBillingInfo;

  @computed('fields.@each.form')
  get allFields() {
    const current_locale = this.cookies.read('current_locale');
    return groupBy(this.fields.toArray(), field => {
      const { main_language } = field;

      if ((main_language && main_language.split('-')[0] === current_locale) || !field.translations || !field.translations.length) {
        field.transName = field.name;
      } else if (field.translations?.length) {

        const transName = field.translations.filter(trans => trans.language_code.split('-')[0] === current_locale);

        if (transName.length) {
          field.transName = transName[0].name;
        } else {
          field.transName = field.name;
        }
      } else {
        field.transName = field.name;
      }

      return field.form;
    });
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
