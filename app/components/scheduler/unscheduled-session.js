import $ from 'jquery';
import Component from '@ember/component';

export default Component.extend({
  classNames        : ['unscheduled-session'],
  classNameBindings : ['isDragActive'],
  isDragActive      : false,
  didInsertElement() {
    this._super(...arguments);
    const $element = $(this.element);
    $element.data('event', {
      title    : $element.text().replace(/\s\s+/g, ' '), // use the element's text as the event title
      stick    : true, // maintain when user navigates (see docs on the renderEvent method)
      id       : $element.attr('id'),
      serverId : this.get('session.id'), // id of the session on the server
      color    : this.get('session.track.color')

    });
    $element.draggable({
      zIndex         : 999,
      revert         : true,      // will cause the event to go back to its
      revertDuration : 0  //  original position after the drag
    });
    $element.data('serverId', this.get('session.id'));
    $element.css('border-color', this.get('session.track.color'));

  },
  dragStart() {
    this.set('isDragActive', true);

  },
  mouseUp() {
    this.set('isDragActive', false);
  }
});
