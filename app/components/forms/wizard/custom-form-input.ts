import Component from '@glimmer/component';
import { slugify } from 'open-event-frontend/utils/text';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import DS from 'ember-data';
import { tracked } from '@glimmer/tracking';
import { languageForms } from 'open-event-frontend/utils/dictionary/language-form';
import { A } from '@ember/array';

interface CustomForm {
  fieldIdentifier: string,
  name: string,
  type: string,
  min: number,
  max: number,
  formIdentifier: string,
  translations: Translate[],
  mainLanguage: string
}

interface SubForm {
  ignoreLanguages:string[],
  name: string,
  languages: object,
  selectedLang: string,
  isDeleted: boolean,
  id: any,
  form_id: string
}

interface Translate {
  name: string,
  code: string,
  isDeleted: boolean,
  id: string,
  form_id: string,
  language_code: string
}

function getIdentifier(name: string, fields: CustomForm[]): string {
  const fieldIdentifiers = new Set(fields.map(field => field.fieldIdentifier));
  let identifier = slugify(name, '_');
  while (fieldIdentifiers.has(identifier)) {
    identifier += '_';
  }

  return identifier;
}

interface Args {
  field: CustomForm | null,
  customForms: CustomForm[],
  form: string,
  event: any,
  formIdentifier: string | '',
  mainLanguage: string | 'en-US',
  min: number | 0,
  max: number | 10,
  onSave: (() => void) | null
}

export default class CustomFormInput extends Component<Args> {
  @tracked
  name = '';

  @tracked
  type = 'text';

  @service
  store!: DS.Store;

  @tracked
  min = 0;

  @tracked
  max = 10;

  @tracked
  mainLanguage = 'en-US'

  @tracked
  selectedLanguage:string[] = [this.mainLanguage]

  @tracked
  subForm:SubForm[] = A([]);

  translations:Translate[] = [];

  @action
  updated(): void {
    this.subForm.clear()
    if (this.args.field) {
      this.name = this.args.field.name;
      this.type = this.args.field.type;
      this.min = this.args.field.min;
      this.max = this.args.field.max;
      this.mainLanguage = this.args.field.mainLanguage;
      this.translations = this.args.field.translations;
      this.translations?.forEach((trans: Translate) => {
        const { name, code, language_code, form_id, isDeleted, id } = trans;
        this.subForm.pushObject({
          id,
          form_id,
          name,
          languages       : languageForms,
          ignoreLanguages : this.selectedLanguage,
          selectedLang    : code || language_code,
          isDeleted
        })
      })
    } else {
      this.name = '';
      this.min = 0;
      this.max = 10;
      this.mainLanguage = 'en-US';
    }
  }

  @computed('name')
  get identifier(): string {
    return getIdentifier(this.name, this.args.customForms);
  }

  @computed('name')
  get validIdentifier(): boolean {
    return this.identifier.trim().length > 0 && this.name.trim().length > 0;
  }

  get languageList(): object[] {
    return languageForms.filter(language =>
      language.code === this.mainLanguage || !this.selectedLanguage.includes(language.code)
    )
  }

  // @computed('translations')
  get translationsList(): Translate[] {
    const translations: Translate[] = []
    this.subForm.forEach(field => {
      const { id, form_id, name, isDeleted } = field
      translations.pushObject({
        id,
        form_id,
        name,
        code          : field.selectedLang,
        language_code : field.selectedLang,
        isDeleted
      })
    })
    return translations;
  }

  @computed('name', 'type')
  get field(): CustomForm {
    return this.store.createRecord('custom-form', {
      fieldIdentifier : this.identifier,
      name            : this.name,
      form            : this.args.form,
      type            : this.type,
      isRequired      : false,
      isIncluded      : true,
      isComplex       : true,
      event           : this.args.event,
      formID          : this.args.formIdentifier,
      min             : this.min,
      max             : this.max,
      translations    : this.translationsList,
      mainLanguage    : this.mainLanguage || 'en-US'
    });
  }

  @action
  addFormField(): void {
    if (!this.validIdentifier) {
      return;
    }
    if (this.args.field) {
      this.args.field.name = this.name;
      this.args.field.type = this.type;
      this.args.field.fieldIdentifier = this.identifier;
      this.args.field.min = this.min;
      this.args.field.max = this.max;
      this.args.field.translations = this.translationsList;
      this.args.field.mainLanguage = this.mainLanguage
    } else {
      this.args.customForms.pushObject(this.field);
    }
    this.name = '';
    this.min = 0;
    this.max = 10;
    this.subForm.clear();
    this.selectedLanguage.clear();
    this.mainLanguage = 'en-US'
    this.selectedLanguage.pushObject(this.mainLanguage);
    this.args.onSave && this.args.onSave();
  }

  @action
  addTranslation():void {
    const obj: any = {
      name            : '',
      languages       : languageForms,
      ignoreLanguages : this.selectedLanguage,
      selectedLang    : '',
      isDeleted       : false
    }
    this.subForm.pushObject(obj);
  }

  @action
  onMainLanguageChange(code:string):void {
    this.onSelectedLanguage(this.mainLanguage, code);
    this.mainLanguage = code;
  }

  @action
  onChildChangeLanguage(form: SubForm, new_code: string) {
    this.onSelectedLanguage(form.selectedLang, new_code)
    form.selectedLang = new_code;
  }


  @action
  onSelectedLanguage(old_code:string, new_code: string):void {
    if (old_code) {
      this.selectedLanguage.removeObject(old_code)
    }
    this.selectedLanguage.pushObject(new_code)
  }

  @computed('subForm.@each.isDeleted')
  get disableAddTranslation() {
    return this.subForm.filter(item => !item.isDeleted).length === languageForms.length - 1;
  }

  @computed('subForm.@each.isDeleted')
  get visibleForm() {
    return this.subForm.filter(item => !item.isDeleted);
  }
}
