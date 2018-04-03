import { merge } from '@ember/polyfills';
import { run } from '@ember/runloop';
import Application from '../../app';
import config from '../../config/environment';
import './login';
import './logout';

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
