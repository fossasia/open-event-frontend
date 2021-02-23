import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { hasSpeakers } from 'open-event-frontend/utils/event';

@classic
export default class FeaturedSpeakerList extends Component {

    @tracked allSpeakers = null;

    async didInsertElement() {
      super.didInsertElement(...arguments);
      this.countSpeakers();
    }

    async countSpeakers() {
      this.allSpeakers = this.allSpeakers ?? await hasSpeakers(this.loader, this.event, true);
    }
}
