import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import $ from 'jquery';
import Component from '@ember/component';

@classic
@classNames('ui', 'action', 'input', 'fluid')
export default class ColorPicker extends Component {
  didInsertElement() {
    super.didInsertElement(...arguments);
    const _this = this;
    $('.picker', this.element).colorPicker({
      doRender : false,
      opacity  : false,
      renderCallback() {
        _this.set('value', `#${this.color.colors.HEX}`);
      }
    });
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    $('.picker', this.element).colorPicker('destroy');
  }
}
