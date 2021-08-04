import { tn } from '../text';

export interface License {
  name: string,
  link: string,
  imageSrc: string,
  logoUrl: string | null
}

export const licenses: License[] = [
  {
    name     : tn.t('Attribution-NonCommercial-NoDerivs'),
    link     : 'https://creativecommons.org/licenses/by-nc-nd/4.0',
    imageSrc : '/images/copyright/attribution-nc-nd.png',
    logoUrl  : '/images/copyright/attribution-nc-nd-logo.png'
  },
  {
    name     : tn.t('Attribution-NonCommercial'),
    link     : 'https://creativecommons.org/licenses/by-nc/4.0',
    imageSrc : '/images/copyright/attribution-nc.png',
    logoUrl  : '/images/copyright/attribution-nc-logo.png'
  },
  {
    name     : tn.t('Public Domain Dedication (CC0)'),
    link     : 'https://creativecommons.org/publicdomain/zero/1.0/',
    imageSrc : '/images/copyright/pdd.png',
    logoUrl  : '/images/copyright/pdd-logo.png'
  },
  {
    name     : tn.t('Attribution'),
    link     : 'https://creativecommons.org/licenses/by/4.0',
    imageSrc : '/images/copyright/attribution.png',
    logoUrl  : '/images/copyright/attribution-logo.png'
  },
  {
    name     : tn.t('All rights reserved'),
    link     : 'https://en.wikipedia.org/wiki/All_rights_reserved',
    imageSrc : '',
    logoUrl  : null
  },
  {
    name     : tn.t('Attribution-NoDerivs'),
    link     : 'https://creativecommons.org/licenses/by-nd/4.0',
    imageSrc : '/images/copyright/attribution-nd.png',
    logoUrl  : '/images/copyright/attribution-nd-logo.png'
  },
  {
    name     : tn.t('Public Domain Work'),
    link     : 'https://creativecommons.org/publicdomain/mark/1.0/',
    imageSrc : '/imagescopyright/pdw.png',
    logoUrl  : '/images/copyright/pdw-logo.png'
  },
  {
    name     : tn.t('Attribution-NonCommercial-ShareAlike'),
    link     : 'https://creativecommons.org/licenses/by-nc-sa/4.0',
    imageSrc : '/imagescopyright/attribution-nc-sa.png',
    logoUrl  : '/images/copyright/attribution-nc-sa.png'
  },
  {
    name     : tn.t('Attribution-ShareAlike'),
    link     : 'https://creativecommons.org/licenses/by-sa/4.0',
    imageSrc : '/imagescopyright/attribution-sa.png',
    logoUrl  : '/images/copyright/attribution-sa-logo.png'
  }
];
