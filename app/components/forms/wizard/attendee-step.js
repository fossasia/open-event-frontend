import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {
  actions: {
    saveDraft() {
      this.onValid(() => {
        this.set('data.event.state', 'draft');
        this.save(this.data);
      });
    },
    move(direction) {
      this.onValid(() => {
        this.move(direction, this.data);
      });
    },
    publish() {
      this.onValid(() => {
        this.set('data.event.state', 'published');
        this.save(this.data);
      });
    }
  }
});
