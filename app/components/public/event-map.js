import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('ui', 'stackable', 'grid')
export default class EventMap extends Component {}
