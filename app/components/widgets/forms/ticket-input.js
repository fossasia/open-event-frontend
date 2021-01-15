import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import { gte } from '@ember/object/computed';
import $ from 'jquery';
import Component from '@ember/component';

@classic
@classNames('ui', 'celled', 'stackable', 'grid', 'ticket-row')
export default class TicketInput extends Component {
  @gte('ticket.maxPrice', 'ticket.minPrice')
  minMaxValid;

  @action
  toggleSettings() {
    this.toggleProperty('isExpanded');
  }

  didRender() {
    super.didRender(...arguments);
    $('.icon.buttons', this.element).find('.button').popup();
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    $('.icon.buttons', this.element).find('.button').popup('destroy');
  }
}
