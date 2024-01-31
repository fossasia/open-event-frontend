import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { groupBy, orderBy } from 'lodash-es';
import { or } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import { nativeLanguage } from 'open-event-frontend/utils/dictionary/native-language';
import { fluentLanguage } from 'open-event-frontend/utils/dictionary/fluent-language';
import { genders } from 'open-event-frontend/utils/dictionary/genders';
import { ageGroups } from 'open-event-frontend/utils/dictionary/age-groups';
import { countries } from 'open-event-frontend/utils/dictionary/demography';
import { homeWikis } from 'open-event-frontend/utils/dictionary/home-wikis';
import { booleanComplex } from 'open-event-frontend/utils/dictionary/boolean_complex';
import { wikiScholarship } from 'open-event-frontend/utils/dictionary/wiki-scholarship';

@classic
export default class AttendeeList extends Component {

  @tracked editFields=false;

  @computed('data.user')
  get buyer() {
    return this.data.user;
  }

  @tracked nativeLanguage = nativeLanguage;
  @tracked fluentLanguage = fluentLanguage;
  @tracked genders = genders;

  @computed('data.attendees')
  get holders() {
    this.data.attendees.forEach(attendee => {
      if (attendee.native_language) {
        this.languageFormMapCodeToName(attendee, 'native_language', this.nativeLanguage);
      }
      if (attendee.fluent_language) {
        this.languageFormMapCodeToName(attendee, 'fluent_language', this.fluentLanguage);
      }
      if (attendee.language_form_1) {
        this.languageFormMapCodeToName(attendee, 'language_form_1', this.nativeLanguage);
      }
      if (attendee.language_form_2) {
        this.languageFormMapCodeToName(attendee, 'language_form_2', this.fluentLanguage);
      }
      if (attendee.gender) {
        this.genderAddSpaces(attendee);
      }
    });
    return this.data.attendees;
  }

  languageFormMapCodeToName(attendee, key, possibleLanguages) {
    const languageFormMap = [];
    const languageFormList = attendee[key].split(',');
    possibleLanguages.forEach(languageForm => {
      languageFormList.forEach(item => {
        if (item === languageForm.code) {
          languageForm.isChecked = true;
          languageFormMap.push(languageForm.name);
        }
      });
    });
    return attendee.set(key.concat('_name_mapping'), languageFormMap.map(select => select).join(', '));
  }

  @computed('genders')
  get genders() {
    return orderBy(this.genders, 'position');
  }

  @computed('ageGroups')
  get ageGroups() {
    return orderBy(ageGroups, 'position');
  }

  @computed('countries')
  get countries() {
    return orderBy(countries, 'name');
  }

  @computed('nativeLanguage')
  get nativeLanguage() {
    return orderBy(this.nativeLanguage, 'position');
  }

  @computed('fluentLanguage')
  get fluentLanguage() {
    return orderBy(this.fluentLanguage, 'position');
  }

  @computed('homeWikis')
  get homeWikis() {
    return orderBy(homeWikis, 'item');
  }

  @computed('wikiScholarship')
  get wikiScholarship() {
    return orderBy(wikiScholarship, 'position');
  }

  @computed('booleanComplex')
  get booleanComplex() {
    return orderBy(booleanComplex, 'position');
  }

  genderAddSpaces(attendee) {
    const listMap = [];
    const genderList = attendee.gender.split(',');
    this.genders.forEach(gender => {
      genderList.forEach(item => {
        if (item === gender.code || item === gender.name) {
          gender.isChecked = true;
          listMap.push(gender.name);
        }
      });
    });
    return attendee.set('gender'.concat('_name_mapping'), listMap.join(', '));
  }

  @or('event.isBillingInfoMandatory', 'data.isBillingEnabled')
  showBillingInfo;

  @computed('fields.@each.form')
  get allFields() {
    const current_locale = this.cookies.read('current_locale');
    const customFields = orderBy(this.fields.toArray()?.map(field => {
      const { main_language } = field;
      field.nameConvert = field.name;
      if (field.name === 'Consent of refund policy') {
        field.nameConvert = 'I agree to the terms of the refund policy of the event.';
      }
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

      return field;
    }), ['position']);
    return groupBy(customFields, field => field.get('form'));
  }

  @action
  toggleEditFields() {
    this.editFields = !this.editFields;
  }

  @action
  async saveHolder() {
    try {
      await this.holders.forEach(holder => holder.save());
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

  @action
  updateLanguageFormsSelection(checked, changed, selectedOptions, holder, field) {
    holder.set(field.fieldIdentifier, selectedOptions.map(select => select.value).join(','));
  }

  @action
  updateGendersSelection(checked, changed, selectedOptions, holder, field) {
    holder.set(field.fieldIdentifier, selectedOptions.map(select => select.value).join(','));
  }
}
