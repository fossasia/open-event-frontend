import Application from 'open-event-frontend/app';
import QUnit from 'qunit';
import config from 'open-event-frontend/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import loadEmberExam from 'ember-exam/test-support/load';

QUnit.config.testTimeout = 300000;

setApplication(Application.create(config.APP));

loadEmberExam();
start();
