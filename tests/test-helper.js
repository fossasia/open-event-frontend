import Application from '@ember/application';
import QUnit from 'qunit';
import config from 'open-event-frontend/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import loadEmberExam from 'ember-exam/test-support/load';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';

const App = Application.extend({
  modulePrefix    : config.modulePrefix,
  podModulePrefix : config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

QUnit.config.testTimeout = 300000;

setApplication(Application.create(config.APP));

loadEmberExam();
start();
