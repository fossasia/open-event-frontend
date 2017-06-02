import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({
  activate() {
    this._super();
    window.scrollTo(0, 0);
  }

});
