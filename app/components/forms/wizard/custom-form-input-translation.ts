import Component from '@glimmer/component';
import { action, computed } from '@ember/object';

interface Args {
  onChange: ((code: string, value: string) => void) | null,
  onRemoveTranslation: ((field: object) => void) | null,
  data: any,
  type: string
}

interface SubForm {
  code: string
}

export default class CustomFormInputTranslation extends Component<Args> {
  self = this

  @computed('args.data.ignoreLanguages.@each')
  get languageList(): object[] {
    const { languages, ignoreLanguages, selectedLang } = this.args.data;
    return languages.filter((item: SubForm) =>
      item.code === selectedLang || !ignoreLanguages.includes(item.code)
    )
  }

  @action
  onChangeLanguage(code: string) {
    if (this.args.onChange) {
      this.args.onChange(this.args.data, code)
    }
  }

  @action
  onRemoveForm() {
    if (this.args.onRemoveTranslation) {
      this.args.onRemoveTranslation(this.args.data)
    }
    if (this.args.onChange) {
      this.args.onChange(this.args.data, '')
    }
  }
}
