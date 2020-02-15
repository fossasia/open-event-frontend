import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'open-event-frontend/config/environment';

const App = Application.extend({
  modulePrefix    : config.modulePrefix,
  podModulePrefix : config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
