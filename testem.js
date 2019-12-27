module.exports = {
  test_page        : 'tests/index.html?hidepassed',
  disable_watching : true,
  launch_in_ci     : [
    'Chrome'
  ],
  launch_in_dev: [
    'Chrome'
  ],
  browser_args: {
    Chrome: {
      mode : 'ci',
      args : [
        // --no-sandbox is needed when running Chrome inside a container
<<<<<<< HEAD
        process.env.TRAVIS ? '--no-sandbox' : null,
        '--disable-gpu',
        '--headless',
=======
        process.env.CI ? '--no-sandbox' : null,
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
>>>>>>> f74dadb1... message
        '--remote-debugging-port=0',
        '--window-size=1440,900'
      ].filter(Boolean)
    }
  },
  browser_disconnect_timeout: 120
};
