import Component from '@glimmer/component';

export default class CellVideoUrl extends Component {

  get link() {
    const { record } = this.args;
    return record.get('url').replace(/^https?\:\/\//, '');
  }
}
