import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({

  /**
   * Attributes
   */


  appEnvironment               : attr('string'),
  appName                      : attr('string'),
  orderExpiryTime              : attr('number', { defaultValue: 15 }),
  tagline                      : attr('string'),
  storagePlace                 : attr('string'),
  awsKey                       : attr('string'),
  awsSecret                    : attr('string'),
  awsBucketName                : attr('string'),
  awsRegion                    : attr('string'),
  gsKey                        : attr('string'),
  gsSecret                     : attr('string'),
  gsBucketName                 : attr('string'),
  googleClientId               : attr('string'),
  googleClientSecret           : attr('string'),
  fbClientId                   : attr('string'),
  fbClientSecret               : attr('string'),
  twConsumerKey                : attr('string'),
  twConsumerSecret             : attr('string'),
  inClientId                   : attr('string'),
  startPgEventId               : attr('string'),
  inClientSecret               : attr('string'),
  paypalMode                   : attr('string'),
  paypalClient                 : attr('string'),
  paypalSecret                 : attr('string'),
  paypalSandboxClient          : attr('string'),
  paypalSandboxSecret          : attr('string'),
  alipaySecretKey              : attr('string'),
  alipayPublishableKey         : attr('string'),
  omiseMode                    : attr('string'),
  omiseTestPublic              : attr('string'),
  omiseTestSecret              : attr('string'),
  omiseLivePublic              : attr('string'),
  omiseLiveSecret              : attr('string'),
  paytmMode                    : attr('string'),
  paytmLiveMerchant            : attr('string'),
  paytmLiveSecret              : attr('string'),
  paytmSandboxMerchant         : attr('string'),
  paytmSandboxSecret           : attr('string'),
  stripeClientId               : attr('string'),
  stripeSecretKey              : attr('string'),
  stripePublishableKey         : attr('string'),
  stripeTestClientId           : attr('string'),
  stripeTestSecretKey          : attr('string'),
  stripeTestPublishableKey     : attr('string'),
  isAlipayActivated            : attr('boolean'),
  isPaypalActivated            : attr('boolean'),
  isStripeActivated            : attr('boolean'),
  isOmiseActivated             : attr('boolean'),
  isPaytmActivated             : attr('boolean'),
  isBillingPaypalActivated     : attr('boolean'),
  emailService                 : attr('string'),
  emailFrom                    : attr('string'),
  emailFromName                : attr('string'),
  sendgridKey                  : attr('string'),
  smtpHost                     : attr('string'),
  smtpUsername                 : attr('string'),
  smtpPassword                 : attr('string'),
  smtpPort                     : attr('string'),
  smtpEncryption               : attr('string'),
  analyticsKey                 : attr('string'),
  googleUrl                    : attr('string'),
  githubUrl                    : attr('string'),
  twitterUrl                   : attr('string'),
  supportUrl                   : attr('string'),
  facebookUrl                  : attr('string'),
  instagramUrl                 : attr('string'),
  weblateUrl                   : attr('string'),
  patreonUrl                   : attr('string'),
  gitterUrl                    : attr('string'),
  telegramUrl                  : attr('string'),
  youtubeUrl                   : attr('string'),
  androidAppUrl                : attr('string'),
  frontendUrl                  : attr('string'),
  webAppUrl                    : attr('string'),
  rocketChatUrl                : attr('string'),
  rocketChatRegistrationSecret : attr('string'),
  staticDomain                 : attr('string'),
  cookiePolicy                 : attr('string'),
  cookiePolicyLink             : attr('string'),
  invoiceSendingDay            : attr('number'),
  invoiceSendingTimezone       : attr('string'),
  adminBillingContactName      : attr('string'),
  adminBillingPhone            : attr('string'),
  adminBillingEmail            : attr('string'),
  adminBillingState            : attr('string'),
  adminBillingCountry          : attr('string'),
  adminBillingTaxInfo          : attr('string'),
  adminCompany                 : attr('string'),
  adminBillingAddress          : attr('string'),
  adminBillingCity             : attr('string'),
  adminBillingZip              : attr('string'),
  adminBillingAdditionalInfo   : attr('string'),
  adminBillingPaypalEmail      : attr('string'),
  adminBillingLogo             : attr('string'),
  isGoogleRecaptchaEnabled     : attr('boolean', { defaultValue: false }),
  googleRecaptchaSite          : attr('string'),
  googleRecaptchaSecret        : attr('string')

});
