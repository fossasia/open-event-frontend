import Controller from '@ember/controller';
import { action } from '@ember/object';
import Speaker from 'open-event-frontend/models/speaker';

export default class SpeakersReorderController extends Controller {
  useSwap = false;

  @action sortEndAction(): void {
    this.model.forEach((speaker: Speaker, index: number) => {
      console.log(speaker.name, speaker.order, index)
    });
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'events/view/speakers/reorder': SpeakersReorderController;
  }
}
