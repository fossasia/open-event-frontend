import Ember from 'ember';

const { Component, observer } = Ember;

export default Component.extend({
  classNameBindings : ['hasLinkName:fields', 'hasLinkName::ui', 'hasLinkName::labeled', 'hasLinkName::input:'],
  hasLinkName       : false,
  isChild           : false,
  canRemoveItem     : true,
  canAddItem        : true,
  protocol          : 'https',
  address           : '',

  segmentedLinkObserver: observer('segmentedLink.{address,protocol}', function() {
    this.setProperties({
      protocol : this.get('segmentedLink.protocol'),
      address  : this.get('segmentedLink.address')
    });
  }),

  protocolAddressObserver: observer('protocol', 'address', function() {
    let add = this.get('address');
    let proto = this.get('protocol');
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
  }),

  didInsertElement() {
    this._super(...arguments);
    if (this.get('segmentedLink')) {
      this.setProperties({
        protocol : this.get('segmentedLink.protocol'),
        address  : this.get('segmentedLink.address')
      });
    }
  }
});
