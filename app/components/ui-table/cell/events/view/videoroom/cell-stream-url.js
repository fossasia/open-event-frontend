import Component from '@glimmer/component';

export default class CellStreamUrl extends Component {
  @computed
  get host() {
    return window.location.host;
  }
}
