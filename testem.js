/* eslint-env node */

let browserArgs = {
  'Chrome': ['--headless', '--disable-gpu', '--remote-debugging-port=9222']
};

if (process.env.NO_BROWSER_ARGS && process.env.NO_BROWSER_ARGS === 'true') {
  browserArgs = {};
}

module.exports = {
  'test_page'        : 'tests/index.html?hidepassed',
  'disable_watching' : true,
  'launch_in_ci'     : [
    'PhantomJS'
  ],
  'launch_in_dev': [
    'PhantomJS',
    'Chrome'
  ],
  browser_args: browserArgs
};
