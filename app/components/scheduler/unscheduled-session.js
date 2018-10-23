import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);
    this.$().data('event', {
      title    : this.$().text().replace(/\s\s+/g, ' '), // use the element's text as the event title
      stick    : true, // maintain when user navigates (see docs on the renderEvent method)
      id       : this.$().attr('id'),
      serverId : this.get('session.id'), // id of the session on the server
      color    : this.get('session.track.color')

    });
    this.$().draggable({
      zIndex         : 999,
      revert         : true,      // will cause the event to go back to its
      revertDuration : 0  //  original position after the drag
    });
    this.$().css('background-color', this.get('session.track.color'));
    this.$().data('serverId', this.get('session.id'));
  }
});
