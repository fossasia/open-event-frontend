import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { SocialMedia, socialMediaMap, socialMediaSites } from 'open-event-frontend/utils/dictionary/social-media';

interface Args {
  site: string
}

export default class SocialLinkField extends Component<Args> {
  @service l10n: any;

  @tracked
  site = 'website';

  get extras(): string[] {
    // Workaround to list translatable strings which
    // are not present anywhere statically
    return [this.l10n.t('Website')];
  }

  get sites(): SocialMedia[] {
    return [
      {
        name       : 'Website',
        identifier : 'website'
      },
      ...socialMediaSites
    ];
  }

  get prefix(): string | undefined {
    return socialMediaMap[this.args.site]?.prefix;
  }
}
