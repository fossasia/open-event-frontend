import Component from '@ember/component';

export default Component.extend({
  classNames : ['ui', 'fluid', 'card'],
  actions    : {
    openModal() {
      this.set('isEventRevisionModalOpen', true);
    }
  }
});
