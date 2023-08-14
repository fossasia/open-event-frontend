import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SelectingLanguageService extends Service {
  @tracked
  selectingLanguage = null;

  @tracked
  name = null;

  @tracked
  isStreamYardVisible = true;

  @tracked
  translationYoutubeId = null;

  setLanguage(language) {
    this.selectingLanguage = language;
    this.isStreamYardVisible = true;
  }

  setName(name) {
    this.name = name;
  }

  setStreamYardVisibility(isVisible) {
    this.isStreamYardVisible = isVisible;
  }

  updateTranslationYTId() {
    if (this.selectingLanguage.includes('youtube')) {
      const [, id] = this.selectingLanguage.split('v=');
      if (id) {
        this.translationYoutubeId = id;
      }
    }
  }

  getLanguage() {
    return this.selectingLanguage;
  }

  getName() {
    return this.name;
  }
}
