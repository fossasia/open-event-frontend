import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('welcome-header', 'mobile', 'hidden', 'text', 'centered')
export default class WelcomeHeader extends Component {}
