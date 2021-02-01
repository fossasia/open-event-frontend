import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('ui', 'fluid', 'card')
export default class SpeakerSession extends Component {}
