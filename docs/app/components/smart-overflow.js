import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import $ from 'jquery';
import Component from '@ember/component';

@classic
@classNames('smart-overflow')
export default class SmartOverflow extends Component {
  didInsertElement() {
    super.didInsertElement(...arguments);
    const $header = $(this.element);
    const $headerSpan = $header.find('span');
    $header.attr('data-content', $headerSpan.text());
    $header.attr('data-variation', 'tiny');
    while ($headerSpan.outerHeight() > $header.height()) {
      $headerSpan.text((index, text) => {
        return text.replace(/\W*\s(\S)*$/, '...');
      });
      $header.popup({
        position: 'top center'
      });
      this.set('$header', $header);
    }
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    if (this.$header) {
      this.$header.popup('destroy');
    }
  }
}
