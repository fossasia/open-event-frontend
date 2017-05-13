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
    this.set('segmentedLink', {
      protocol : this.get('protocol'),
      address  : this.get('address')
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
