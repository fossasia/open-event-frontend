import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {
  actions: {
    submit(data) {
      this.onValid(() => {
        this.save(data);
      });
    }
  }
});
