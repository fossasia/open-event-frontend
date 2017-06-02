import Ember from 'ember';
import ResetScrollPositionMixin from 'open-event-frontend/mixins/reset-scroll-position';

const { Route, RSVP } = Ember;

export default Route.extend(ResetScrollPositionMixin, {
  titleToken() {
    return this.i18n.t('Sessions');
  },

  model() {
    return RSVP.hash({
      event: this._super(...arguments)
    });
  }
});
