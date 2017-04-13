import Ember from 'ember';

const { Component, observer, merge, on } = Ember;

export default Component.extend({
  tagName           : 'div',
  classNames        : ['ui', 'modal'],
  classNameBindings : ['isFullScreen:fullscreen', 'isSmall:small', 'isLarge:large'],

  openObserver: observer('isOpen', function() {
    if (this.get('isOpen')) {
      this.$().modal('show');
    } else {
      this.$().modal('hide');
    }
  }),

  __didInsertElement: on('didInsertElement', function() {
    const defaultOptions = {
      dimmerSettings: {
        variation: 'inverted'
      },
      onHide: () => {
        this.set('isOpen', false);
        if (this.get('onHide')) {
          this.onHide();
        }
      },
      onVisible: () => {
        this.set('isOpen', true);
        this.$().modal('refresh');
        this.$('[data-content]').popup({
          inline: true
        });
        if (this.get('onVisible')) {
          this.onVisible();
        }
      }
    };
    const options = this.get('options') ? merge(defaultOptions, this.get('options')) : defaultOptions;

    this.$().modal(options);

    if (this.get('isOpen')) {
      this.$().modal('show');
    }
  })
});
