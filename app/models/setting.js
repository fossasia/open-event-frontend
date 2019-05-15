import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { computedSegmentedLink } from 'open-event-frontend/utils/computed-helpers';

export default ModelBase.extend({

  /**
   * Attributes
   */

  appEnvironment       : attr('string'),
  appName              : attr('string'),
  tagline              : attr('string'),
  secret               : attr('string'),
  storagePlace         : attr('string'),
  awsKey               : attr('string'),
  awsSecret            : attr('string'),
  awsBucketName        : attr('string'),
  awsRegion            : attr('string'),
  gsKey                : attr('string'),
  gsSecret             : attr('string'),
  gsBucketName         : attr('string'),
  googleClientId       : attr('string'),
  googleClientSecret   : attr('string'),
  fbClientId           : attr('string'),
  fbClientSecret       : attr('string'),
  twConsumerKey        : attr('string'),
  twConsumerSecret     : attr('string'),
  inClientId           : attr('string'),
  inClientSecret       : attr('string'),
  paypalMode           : attr('string'),
  paypalClient         : attr('string'),
  paypalSecret         : attr('string'),
  paypalSandboxClient  : attr('string'),
  paypalSandboxSecret  : attr('string'),
  omiseMode            : attr('string'),
  omiseTestPublic      : attr('string'),
  omiseTestSecret      : attr('string'),
  omiseLivePublic      : attr('string'),
  omiseLiveSecret      : attr('string'),
  stripeClientId       : attr('string'),
  stripeSecretKey      : attr('string'),
  stripePublishableKey : attr('string'),
  isPaypalActivated    : attr('boolean'),
  isStripeActivated    : attr('boolean'),
  isOmiseActivated     : attr('boolean'),
  emailService         : attr('string'),
  emailFrom            : attr('string'),
  emailFromName        : attr('string'),
  sendgridKey          : attr('string'),
  smtpHost             : attr('string'),
  smtpUsername         : attr('string'),
  smtpPassword         : attr('string'),
  smtpPort             : attr('string'),
  smtpEncryption       : attr('string'),
  analyticsKey         : attr('string'),
  googleUrl            : attr('string'),
  githubUrl            : attr('string'),
  twitterUrl           : attr('string'),
  supportUrl           : attr('string'),
  facebookUrl          : attr('string'),
  youtubeUrl           : attr('string'),
  androidAppUrl        : attr('string'),
  frontendUrl          : attr('string'),
  webAppUrl            : attr('string'),
  staticDomain         : attr('string'),
  cookiePolicy         : attr('string'),
  cookiePolicyLink     : attr('string'),

  /**
   * Computed properties
   */

  segmentedSupportUrl    : computedSegmentedLink.bind(this)('supportUrl'),
  segmentedFacebookUrl   : computedSegmentedLink.bind(this)('facebookUrl'),
  segmentedTwitterUrl    : computedSegmentedLink.bind(this)('twitterUrl'),
  segmentedGoogleUrl     : computedSegmentedLink.bind(this)('googleUrl'),
  segmentedYoutubeUrl    : computedSegmentedLink.bind(this)('youtubeUrl'),
  segmentedGithubUrl     : computedSegmentedLink.bind(this)('githubUrl'),
  segmentedAndroidAppUrl : computedSegmentedLink.bind(this)('androidAppUrl'),
  segmentedWebAppUrl     : computedSegmentedLink.bind(this)('webAppUrl'),
  segmentedFrontendUrl   : computedSegmentedLink.bind(this)('frontendUrl')
});
