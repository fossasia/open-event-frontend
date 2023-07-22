import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SelectingLanguageService extends Service {
  @tracked
  selectingLanguage = null;

  setLanguage(language) {
    this.selectingLanguage = language;
  }

  getLanguage() {
    return this.selectingLanguage;
  }
}
