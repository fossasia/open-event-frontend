import Component from '@glimmer/component';

export default class CellStreamUrl extends Component {
  get host() {
    return window.location.host;
  }
}
