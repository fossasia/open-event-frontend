import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
export default class PageSizeInput extends Component {
  sizes = [10, 25, 50, 100, 250, 'All'];
}
