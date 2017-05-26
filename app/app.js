import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'open-event-frontend/config/environment';

const { Application } = Ember;

let App;

App = Application.extend({
  modulePrefix    : config.modulePrefix,
  podModulePrefix : config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
