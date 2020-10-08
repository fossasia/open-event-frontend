import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';
import { computed } from '@ember/object';
@classic
@classNames('ui', 'stackable', 'grid')
export default class EventMap extends Component {
	@computed('event.locationName')
	get eventLocation() {
		return this.event.locationName.split(", ");
	}
}
