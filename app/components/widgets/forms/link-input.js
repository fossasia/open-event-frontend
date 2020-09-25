import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import { observes } from '@ember-decorators/object';
import Component from '@ember/component';
import '@ember/object';
import { socialPlatforms } from 'open-event-frontend/utils/computed-helpers';

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
  isSocialLink = false;
  canRemoveItem = true;
  canAddItem = true;
  protocol = 'https://';
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
    const link = this.linkName?.toLowerCase();

    let add = this.address;
    let proto = this.protocol;
    if (add.includes('http://') || add.includes('https://')) {
      const temp = add.split('://');
      proto = temp[0] + '://';
      add = temp[1];
    }
    if (add.includes('www.')) {
      add = add.substring(add.indexOf('.') + 1);
    }
    if (socialPlatforms.includes(link)) {
      proto = `https://${link}.com/`;
    }
    this.set('segmentedLink', {
      protocol : proto,
      address  : add
    });
  }

  @observes('linkName')
  linkNameObserver() {
    const link = this.linkName;
    if (socialPlatforms.includes(link)) {
      if (link==='weibo') {
        this.set('segmentedLink', {
          protocol : `https://${link}.com/u/`,
          address  : ''
        });
      } else {
        this.set('segmentedLink', {
          protocol : `https://${link}.com/`,
          address  : ''
        });
      }
    } else {
      this.set('segmentedLink', {
        protocol : 'https://',
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
