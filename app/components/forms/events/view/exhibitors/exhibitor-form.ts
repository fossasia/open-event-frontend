import Component from '@glimmer/component';
import Exhibitor, { SocialLink } from 'open-event-frontend/models/exhibitor';
import { protocolLessValidUrlPattern, validEmail } from 'open-event-frontend/utils/validators';
import { inject as service } from '@ember/service';
import { Rules } from 'open-event-frontend/components/forms/form';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Event from 'open-event-frontend/models/event';

interface Args {
  exhibitor: Exhibitor,
  event: Event
}

export default class ExhibitorForm extends Component<Args> {
  @service l10n: any;
  @service router: any;
  @service notify: any;
  @service errorHandler: any;

  @tracked loading = false;

  get rules(): Rules {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',

      fields: {
        name: {
          rules: [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a name')
            }
          ]
        },
        url: {
          rules: [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a url')
            },
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        },
        contactEmail: {
          optional : true,
          rules    : [
            {
              type   : 'regExp',
              value  : validEmail,
              prompt : this.l10n.t('Please enter a valid email address')
            }
          ]
        },
        contactLink: {
          optional : true,
          rules    : [
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid contact link')
            }
          ]
        },
        logoUrl: {
          rules: [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please upload exhibitor\'s logo.')
            }
          ]
        },
        videoUrl: {
          optional : true,
          rules    : [
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        },
        slidesUrl: {
          optional : true,
          rules    : [
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid url')
            }
          ]
        }
      }
    };
  }

  @action addSocialLink(type: string): void {
    const { exhibitor } = this.args;
    if (!exhibitor.socialLinks) {
      exhibitor.socialLinks = [];
    }
    if (type === 'customLink') {
      exhibitor.socialLinks = [...exhibitor.socialLinks, { name: '', link: '', is_custom: true }];
    } else {
      exhibitor.socialLinks = [...exhibitor.socialLinks, { name: '', link: '', is_custom: false }];
    }
  }

  @action removeSocialLink(link: SocialLink): void {
    const { exhibitor } = this.args;
    exhibitor.socialLinks = exhibitor.socialLinks.filter(sl => sl !== link);
  }

  @action async save(): Promise<void> {
    try {
      this.loading = true;
      await this.args.exhibitor.save();
      this.router.transitionTo('events.view.exhibitors', this.args.event.id);
      this.notify.success(this.l10n.t('Your exhibitor has been saved'),
        {
          id: 'stream_save'
        });
    } catch (e) {
      console.error('Error while saving exhibtor', e);
      this.errorHandler.handle(e);
    } finally {
      this.loading = false;
    }
  }

}
