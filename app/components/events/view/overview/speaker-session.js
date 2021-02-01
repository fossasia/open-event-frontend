import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';
import { computed } from '@ember/object';

@classic
@classNames('ui', 'fluid', 'card')
export default class SpeakerSession extends Component {

	@computed('data.event.speakers.[]')
	get noSessionSpeaker() {
		let count = 0;
		this.data.event.speakers.map(x => {
		if (x.get('sessions').length === 0) {count += 1}
		});
		return count;
	}
}
