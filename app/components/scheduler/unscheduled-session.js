import classic from 'ember-classic-decorator';
import { classNames, classNameBindings } from '@ember-decorators/component';
import $ from 'jquery';
import Component from '@ember/component';
import { getTextColor } from 'open-event-frontend/utils/color';

@classic
@classNames('unscheduled-session')
@classNameBindings('isDragActive')
export default class UnscheduledSession extends Component {
  isDragActive = false;

  didInsertElement() {
    super.didInsertElement(...arguments);
    const color = this.session.get('track.color');
    const $element = $(this.element);
    $element.data('event', {
      title     : $element.text().replace(/\s\s+/g, ' '), // use the element's text as the event title
      stick     : true, // maintain when user navigates (see docs on the renderEvent method)
      id        : $element.attr('id'),
      serverId  : this.session.id, // id of the session on the server
      color,
      textColor : getTextColor(color)
    });
    $element.draggable({
      zIndex         : 999,
      revert         : true,      // will cause the event to go back to its
      revertDuration : 0  //  original position after the drag
    });
    $element.data('serverId', this.session.id);
    $element.css('border-color', color);

  }

  dragStart() {
    this.set('isDragActive', true);

  }

  mouseUp() {
    this.set('isDragActive', false);
  }
}
