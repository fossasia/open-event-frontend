import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

@classic
export default class FeaturedSpeakerList extends Component {
  @service('event') eventService;

  @tracked allSpeakers = null;

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.countSpeakers();
  }

  async countSpeakers() {
    this.allSpeakers = this.allSpeakers ?? (await this.eventService.getSpeakersMeta(this.event.id)).meta.count;
  }
}
