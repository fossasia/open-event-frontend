import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
export default class FeaturedSpeakerList extends Component {
    
    moreSpeakers = false;
    
    async loadSpeakerAvailability() {
        const moreSpeaker = await this.loader.load(`/events/${this.event.identifier}/more-speakers`);
        if(moreSpeaker > 0){
            this.set('moreSpeakers', true);
        }
    }
    didInsertElement() {
        this._super(...arguments);
        this.loadSpeakerAvailability();
    }
}
