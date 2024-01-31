import Service from '@ember/service';

export default Service.extend({
  router: {
    router: {
      state: {
        params: {
          'events.view': {
            event_id: 1
          }
        }
      }
    },
    generate() {
      return 'http://dummy-url.com';
    }
  }
});
