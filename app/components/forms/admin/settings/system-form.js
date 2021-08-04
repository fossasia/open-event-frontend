import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { protocolLessValidUrlPattern } from 'open-event-frontend/utils/validators';

export default Component.extend(FormMixin, {
  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        appName: {
          identifier : 'app_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the App name')
            }
          ]
        },

        tagLine: {
          identifier : 'tag_line',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a tag line')
            }
          ]
        },

        apiUrl: {
          identifier : 'api_url',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the API Url')
            },
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid URL for the API')
            }
          ]
        },

        googleStorageBucketName: {
          identifier : 'google_storage_bucket_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the Bucket name')
            }
          ]
        },

        googleStorageAccessKey: {
          identifier : 'google_storage_access_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the access key')
            }
          ]
        },

        googleStorageAccessSecret: {
          identifier : 'google_storage_access_secret',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the access secret')
            }
          ]
        },

        amazonS3Region: {
          identifier : 'amazon_s3_region',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please select a region')
            }
          ]
        },

        amazonS3BucketName: {
          identifier : 'amazon_s3_bucket_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the Bucket name')
            }
          ]
        },

        amazonS3Key: {
          identifier : 'amazon_s3_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the key')
            }
          ]
        },

        amazonS3Secret: {
          identifier : 'amazon_s3_secret',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the secret')
            }
          ]
        },

        googlereCAPTCHAsitekey: {
          identifier : 'google_recaptcha_sitekey',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the reCAPTCHA site key')
            }
          ]
        },

        orderExpiryTime: {
          identifier : 'order_expiry_time',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a Expiry Time for Order')
            }]
        },

        googlereCAPTCHAsecretkey: {
          identifier : 'google_recaptcha_secretkey',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the reCAPTCHA secret key')
            }
          ]
        },

        emailFrom: {
          identifier : 'email_from',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the from email')
            },
            {
              type   : 'email',
              prompt : this.l10n.t('Please enter a valid email address')
            }
          ]
        },

        emailFromName: {
          identifier : 'email_from_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter name for from email')
            }
          ]
        },

        frontendUrl: {
          identifier : 'frontend_url',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the Frontend Url')
            },
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid URL for Frontend')
            }
          ]
        },

        smtpHost: {
          identifier : 'smtp_host',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the SMTP host')
            }
          ]
        },

        smtpPort: {
          identifier : 'smtp_port',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the SMTP port number')
            },
            {
              type   : 'integer',
              prompt : this.l10n.t('Please enter a valid port number')
            }
          ]
        },

        sendgridToken: {
          identifier : 'sendgrid_token',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the token for Sendgrid')
            }
          ]
        }
      }
    };
  },

  actions: {
    submit() {
      this.onValid(() => {
        this.sendAction('save');
      });
    }
  }
});
