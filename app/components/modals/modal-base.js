import Ember from 'ember';
import UiModal from 'semantic-ui-ember/components/ui-modal';

const { observer, merge, assign, testing } = Ember;

export default UiModal.extend({
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

  didRender()  {
    this._super(...arguments);
    try {
      this.$().modal('refresh');
    } catch (ignored) { /* ignored exception */ }
  },


  willInitSemantic(settings) {
    this._super(...arguments);

    const defaultOptions = {
      detachable     : false,
      duration       : testing ? 0 : 200,
      dimmerSettings : {
        dimmerName : `${this.get('elementId')}-modal-dimmer`,
        variation  : 'inverted'
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
    assign(settings, options);
  },

  didInitSemantic() {
    if (this.get('isOpen')) {
      this.$().modal('show');
    }
  }
});
