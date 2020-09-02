import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('ui', 'stackable', 'centered', 'grid')
export default class ImportsHistorySection extends Component {}
