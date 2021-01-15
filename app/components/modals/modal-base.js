import $ from 'jquery';
import { observer } from '@ember/object';
import { assign } from '@ember/polyfills';
import { merge } from 'lodash-es';
import UiModal from 'semantic-ui-ember/components/ui-modal';
import { isTesting } from 'open-event-frontend/utils/testing';

export default UiModal.extend({
  tagName           : 'div',
  classNames        : ['centered-modal'],
  classNameBindings : ['isFullScreen:fullscreen', 'isSmall:small', 'isLarge:large'],

  openObserver: observer('isOpen', function() {
    const $element = $(this.element);
    if (this.isOpen) {
      $element.modal(this.defaultOptions).modal('show');
      this.onOpen?.();
    } else {
      this.close();
      $element.modal('hide');
      this.onClose?.();
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

    this.defaultOptions = {
      centered       : false,
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

    const options = this.options ? merge(this.defaultOptions, this.options) : this.defaultOptions;
    assign(settings, options);
  },

  didInitSemantic() {
    if (this.isOpen) {
      $(this.element).modal(this.defaultOptions).modal('show');
    }
  }
});
