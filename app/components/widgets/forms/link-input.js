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

  @observes('linkName')
  linkNameObserver() {
    let link = this.linkName;
    if (link === 'Twitter') {
      this.set('segmentedLink', {
        protocol : 'https://twitter.com/',
        address  : ''
      });
    }
    if (link === 'Facebook') {
      this.set('segmentedLink', {
        protocol : 'https://facebook.com/',
        address  : ''
      });
    }
    if (link === 'Instagram') {
      this.set('segmentedLink', {
        protocol : 'https://instagram.com/',
        address  : ''
      });
    }
    if (link === 'Linkedin') {
      this.set('segmentedLink', {
        protocol : 'https://www.linkedin.com/',
        address  : ''
      });
    }
    if (link === 'Youtube') {
      this.set('segmentedLink', {
        protocol : 'https://youtube.com/',
        address  : ''
      });
    }
    if (link === 'Website') {
      this.set('segmentedLink', {
        protocol : 'https',
        address  : ''
      });
    }
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
