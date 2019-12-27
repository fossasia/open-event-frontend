import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'open-event-frontend/config/environment';

<<<<<<< HEAD
const App = Application.extend({
  modulePrefix    : config.modulePrefix,
  podModulePrefix : config.podModulePrefix,
  Resolver
});
=======
export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}
>>>>>>> f74dadb1... message

loadInitializers(App, config.modulePrefix);
