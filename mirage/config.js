import ENV from 'open-event-frontend/config/environment';
import Response from 'ember-cli-mirage/response';

export default function() {
  this.passthrough();
  this.passthrough(`${ENV.sentry.server}/**`);
  if (ENV.APP.apiHost !== 'http://api.localhost.net') {
    this.passthrough(`${ENV.APP.apiHost}/**`);
  } else {
    this.urlPrefix = `${ENV.APP.apiHost}/${ENV.APP.apiNamespace}`;
  }

  this.post(`${ENV.APP.apiHost}/auth/session`, (db, request) => {
    const params = JSON.parse(request.requestBody);
    if (!params.email || !params.password) {
      return new Response(422, { 'Content-Type': 'application/json' }, { status: 'error' });
    }
    const validCredentials = {
      'correct_user@example.com'   : 'pa$$word#',
      'incorrect_user@example.com' : 'b832cf76-fe82-4da3-9818-578052bd4d5f'
    };

    if (!validCredentials[params.email] || validCredentials[params.email] !== params.password) {
      return new Response(401, { 'Content-Type': 'application/json' }, {
        'description' : 'Invalid credentials',
        'error'       : 'Unauthorized',
        'status_code' : 401
      });
    }

    // A dummy but a valid JWT token for identity 1
    const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.'
      + 'eyJleHAiOjE1MDEzMDc1NjcsIm5iZiI6MTUwMTIyMTE2NywiaWF0IjoxNTAxMjIxMTY3LCJpZGVudGl0eSI6MX0=.'
      + '3-Er7clX1qE_aWn99nQ6XbkMmH7tO2-djdrobiN-RRA';

    return new Response(200, { 'Content-Type': 'application/json' }, { token: jwt });
  });

  this.get('/events', db => {
    return db.events.all();
  });

  this.get('/events/:event_id', (db, request) => {
    return db.events.find(request.params.event_id);
  });

  this.get('/event-types/:event_type_id', (db, request) => {
    return db.eventTypes.find(request.params.event_type_id);
  });

  this.get('/events/:event_id/event-types/:event_type_id', (db, request) => {
    return db.eventTypes.find(request.params.event_type_id);
  });
}
