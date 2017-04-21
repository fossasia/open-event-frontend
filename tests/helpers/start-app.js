import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import './login';
import './logout';

const { merge, run } = Ember;

export default function startApp(attrs) {
  let attributes = merge({}, config.APP);
  attributes = merge(attributes, attrs);

  return run(() => {
    let application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
    return application;
  });
}
