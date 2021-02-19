import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { SPEAKERS_FILTER } from 'open-event-frontend/routes/public/speakers';

@classic
export default class FeaturedSpeakerList extends Component {

    @tracked
    allSpeakers = null;
    async didInsertElement() {
        super.didInsertElement(...arguments);
        this.countSpeakers();
    }
    async countSpeakers() {
       this.allSpeakers = (await this.loader.load(`/events/${this.event.id}/speakers?cache=true&public=true&fields[speaker]=id&page[size]=1&filter=${JSON.stringify(SPEAKERS_FILTER)}`)).meta.count;
    }

}
