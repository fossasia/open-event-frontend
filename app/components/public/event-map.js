import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import ENV from 'open-event-frontend/config/environment';

@classic
export default class EventMap extends Component {
    mapTile =   ENV.mapboxToken ? `https://api.mapbox.com/styles/v1/mapbox/emerald-v8/tiles/{z}/{x}/{y}?access_token=${ENV.mapboxToken}` : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
}
