const browsers = [
  'Firefox >= 55', 'Chrome >=55', 'Android >= 4.4', 'Safari >= 10', 'iOS >= 10'
];

const isCI = !!process.env.CI;
const isProduction = process.env.EMBER_ENV === 'production';

if (isCI || isProduction) {
  browsers.push('defaults');
}

module.exports = {
  browsers
};
