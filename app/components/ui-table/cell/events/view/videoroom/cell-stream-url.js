import Component from '@glimmer/component';

export default class CellStreamUrl extends Component {
  get streamUrl() {
    return `${window.location.host}/e/${this.args.extraRecords.identifier || this.args.extraRecords.event.get('identifier')}/video/${this.args.record.get('slugName')}/${this.args.record.get('id')}`;
  }
}
