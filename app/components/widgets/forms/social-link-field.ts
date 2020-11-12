import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { SocialMedia, socialMediaMap, socialMediaSites } from 'open-event-frontend/utils/dictionary/social-media';

interface Args {
  site: string
}

export default class SocialLinkField extends Component<Args> {
  @tracked
  site = 'website';

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
