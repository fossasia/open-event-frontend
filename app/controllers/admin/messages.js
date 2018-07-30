import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    save() {
      let systemMessages = this.get('model');
      systemMessages.forEach(systemMessage => {
        systemMessage.save();
      });
    }
  }
});
