import $ from 'jquery';
import { observer } from '@ember/object';
import { assign } from '@ember/polyfills';
import { merge } from 'lodash-es';
import UiModal from 'semantic-ui-ember/components/ui-modal';
import { isTesting } from 'open-event-frontend/utils/testing';

export default UiModal.extend({
  tagName           : 'div',
  classNameBindings : ['isFullScreen:fullscreen', 'isSmall:small', 'isLarge:large', 'noCropper'],

  openObserver: observer('isOpen', 'noCroppper', function() {
    const $element = $(this.element);
    if (this.isOpen) {
      if (this.noCropper) {
        $element.modal({
          centered: false
        }).modal('show');
      } else {
        $element.modal('show');
      } 
    } else {
      $element.modal('hide');
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
      $(this.element).modal('refresh');
    } catch (ignored) {
      /* ignored exception */
      console.warn('Error refreshing modal', ignored);
    }
  },


  willInitSemantic(settings) {
    this._super(...arguments);

    const defaultOptions = {
      detachable     : false,
      duration       : isTesting ? 0 : 200,
      dimmerSettings : {
        dimmerName : `${this.elementId}-modal-dimmer`,
        variation  : 'inverted'
      },
      onHide: () => {
        this.set('isOpen', false);
        if (this.onHide) {
          this.onHide();
        }
      },
      onDeny: () => {
        if (this.onDeny) {
          this.onDeny();
        }
        return true;
      },
      onApprove: () => {
        if (this.onApprove) {
          this.onApprove();
        }
        return true;
      },

      onVisible: () => {
        this.set('isOpen', true);
        const $element = $(this.element);
        $element.modal('refresh');
        $element.find('[data-content]').popup({
          inline: true
        });
        if (this.onVisible) {
          this.onVisible();
        }
      }
    };

    const options = this.options ? merge(defaultOptions, this.options) : defaultOptions;
    assign(settings, options);
  },

  didInitSemantic() {
    if (this.isOpen) {
      $(this.element).modal('show');
    }
  }
});
