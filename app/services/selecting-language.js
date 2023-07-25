import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SelectingLanguageService extends Service {
  @tracked
  selectingLanguage = null;

  @tracked
  isStreamYardVisible = true;

  setLanguage(language) {
    this.selectingLanguage = language;
    this.isStreamYardVisible = true;
  }

  setStreamYardVisibility(isVisible) {
    this.isStreamYardVisible = isVisible;
  }

  getLanguage() {
    return this.selectingLanguage;
  }
}
