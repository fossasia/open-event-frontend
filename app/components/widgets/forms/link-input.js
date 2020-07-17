import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import { observes } from '@ember-decorators/object';
import Component from '@ember/component';
import '@ember/object';

@classic
@classNameBindings(
  'hasLinkName:fields',
  'hasLinkName::ui',
  'hasLinkName::labeled',
  'hasLinkName::input:'
)
export default class LinkInput extends Component {
  hasLinkName = false;
  isChild = false;
  canRemoveItem = true;
  canAddItem = true;
  protocol = 'https';
  address = '';

  @observes('segmentedLink.{address,protocol}')
  segmentedLinkObserver() {
    this.setProperties({
      protocol : this.segmentedLink.protocol,
      address  : this.segmentedLink.address
    });
  }

  @observes('protocol', 'address')
  protocolAddressObserver() {
    let add = this.address;
    let proto = this.protocol;
    if (add.includes('http://') || add.includes('https://')) {
      let temp = add.split('://');
      proto = temp[0];
      add = temp[1];
    }
    if (add.includes('www.')) {
      add = add.substring(add.indexOf('.') + 1);
    }
    this.set('segmentedLink', {
      protocol : proto,
      address  : add
    });
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    if (this.segmentedLink) {
      this.setProperties({
        protocol : this.segmentedLink.protocol,
        address  : this.segmentedLink.address
      });
    }
  }
}
