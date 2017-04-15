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

  close() {
    this.set('isOpen', false);
  },

  open() {
    this.set('isOpen', true);
  },

  actions: {
    close() {
      this.close();
    }
  },

  __didRender: on('didRender', function() {
    try {
      this.$().modal('refresh');
    } catch (ignored) { /* ignored exception */ }
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
      onDeny: () => {
        if (this.get('onDeny')) {
          this.onDeny();
        }
        return true;
      },
      onApprove: () => {
        if (this.get('onApprove')) {
          this.onApprove();
        }
        return true;
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
