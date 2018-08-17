import Component from '@ember/component';
import { run } from '@ember/runloop';

export default Component.extend({
  classNameBindings : [':unscheduled'],
  draggable         : true,

  didInsertElement() {
    run.scheduleOnce('afterRender', () => {
      this.$().draggable({
        zIndex         : 999,
        revert         : true,      // will cause the event to go back to its
        revertDuration : 0  //  original position after the drag
      });

      this.$().data('event', {
        title    : this.$().text().replace(/\s\s+/g, ' '), // use the element's text as the event title
        id       : this.$().attr('id'),
        serverId : this.get('session.id'),
        stick    : true, // maintain when user navigates (see docs on the renderEvent method)
        color    : this.get('session.track.color')
      });
      this.$().data('serverId', this.get('session.id')); // needed apart from the one defined above, for external event (unscheduled session) dropping

      this.$().css('background-color', this.get('session.track.color'));
    });
  }
});