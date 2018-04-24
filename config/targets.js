const browsers = [
  'Firefox >= 20', 'Chrome >=20', 'Android >= 4.0', 'Safari >= 7', 'iOS >= 5'
];

const isCI = !!process.env.CI;
const isProduction = process.env.EMBER_ENV === 'production';

if (isCI || isProduction) {
  browsers.push('ie 11');
}

module.exports = {
  browsers
};
