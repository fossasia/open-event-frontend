import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

@classic
@classNames('ui', 'stackable', 'grid')
export default class EventMap extends Component {
    @tracked
    lat = this.event.latitude;

    @tracked
    lng = this.event.longitude;
    
    @tracked
    zoom = 4;

    @tracked
    emberConfLocation = [this.event.latitude, this.event.longitude];
}
