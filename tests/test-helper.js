import Application from 'open-event-frontend/app';
import QUnit from 'qunit';
import config from 'open-event-frontend/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import loadEmberExam from 'ember-exam/test-support/load';

QUnit.config.testTimeout = 300000;
let application;
application = setApplication(Application.create(config.APP));
application.__container__.lookup('service:intl').setLocale('en'); // Set the locale to 'en'

loadEmberExam();
start();
