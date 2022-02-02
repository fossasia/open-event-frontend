import { helper } from '@ember/component/helper';

export const isUrlField = params => {
  return [
    'website',
    'blog',
    'twitter',
    'facebook',
    'github',
    'instagram',
    'linkedin',
    'mastodon'
  ].includes(params[0]);
};

export default helper(isUrlField);
