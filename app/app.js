import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'open-event-frontend/config/environment';
import './sentry';

const App = Application.extend({
  modulePrefix    : config.modulePrefix,
  podModulePrefix : config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

