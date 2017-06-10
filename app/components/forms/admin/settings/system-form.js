import Ember from 'ember';
import FormMixin from 'open-event-frontend/mixins/form';

const { Component } = Ember;

export default Component.extend(FormMixin, {
  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        app_name: {
          identifier : 'app_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the App name')
            }
          ]
        },

        tag_line: {
          identifier : 'tag_line',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter a tag line')
            }
          ]
        },

        google_storage_bucket_name: {
          identifier : 'google_storage_bucket_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the Bucket name')
            }
          ]
        },

        google_storage_access_key: {
          identifier : 'google_storage_access_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the access key')
            }
          ]
        },

        google_storage_access_secret: {
          identifier : 'google_storage_access_secret',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the access secret')
            }
          ]
        },

        amazon_s3_region: {
          identifier : 'amazon_s3_region',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please select a region')
            }
          ]
        },

        amazon_s3_bucket_name: {
          identifier : 'amazon_s3_bucket_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the Bucket name')
            }
          ]
        },

        amazon_s3_key: {
          identifier : 'amazon_s3_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the key')
            }
          ]
        },

        amazon_s3_secret: {
          identifier : 'amazon_s3_secret',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the secret')
            }
          ]
        },

        email_from: {
          identifier : 'email_from',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the from email')
            },
            {
              type   : 'email',
              prompt : this.i18n.t('Please enter a valid  email address')
            }
          ]
        },

        email_from_name: {
          identifier : 'email_from_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter name for from email')
            }
          ]
        },

        smtp_host: {
          identifier : 'smtp_host',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the SMTP host')
            }
          ]
        },

        smtp_port: {
          identifier : 'smtp_port',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the SMTP port number')
            },
            {
              type   : 'integer',
              prompt : this.i18n.t('Please enter a valid port number')
            }
          ]
        },

        smtp_username: {
          identifier : 'smtp_username',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the username for SMTP')
            }
          ]
        },

        smtp_password: {
          identifier : 'smtp_password',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the password for SMTP')
            }
          ]
        },

        sendgrid_token: {
          identifier : 'sendgrid_token',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the token for Sendgrid')
            }
          ]
        },

        super_admin_email: {
          identifier : 'super_admin_email',
          rules      : [
            {
              type   : 'email',
              prompt : this.i18n.t('Please enter a valid email address for super admin')
            }
          ]
        },

        secret_key: {
          identifier : 'secret_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the application secret key')
            },
            {
              type   : 'minLength[16]',
              prompt : this.i18n.t('Your application secret key must have at least {ruleValue} characters')
            }
          ]
        }
      }
    };
  },

  actions: {
    submit() {
      this.onValid(() => {
      });
    }
  }
});
