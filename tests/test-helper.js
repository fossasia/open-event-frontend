import Application from 'open-event-frontend/app';
import QUnit from 'qunit';
import config from 'open-event-frontend/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import loadEmberExam from 'ember-exam/test-support/load';
import { getOwner } from '@ember/application';

QUnit.config.testTimeout = 300000;
let application;
application = setApplication(Application.create(config.APP));

// Set the locale globally for all tests
let intlService = getOwner(application).lookup('service:intl');
intlService.setLocale('en');

loadEmberExam();
start();
