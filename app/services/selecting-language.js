import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';

export default class SelectingLanguageService extends Service {
  @tracked
  selectingLanguage = null;

  @tracked
  name = null;

  @tracked
  translationRoomId = null;

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

  setTranslationRoomId(roomId) {
    this.translationRoomId = roomId;
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

  getTranslationRoomId() {
    return this.translationRoomId;
  }

  @computed('name')
  get getName() {
    if (this.name === 'Original') {
      return null;
    }
    return this.name;
  }
}
