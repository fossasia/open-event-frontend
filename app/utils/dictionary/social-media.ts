export const socialMediaNames = ['Facebook', 'Flickr', 'GitHub', 'GitLab', 'Gitter', 'Google Groups', 'Instagram', 'Linkedin', 'Mastodon', 'Patreon', 'Telegram', 'Twitter', 'Vimeo', 'VK', 'Weibo', 'Xing', 'YouTube'];

const identifierOverrides: { [key: string]: string } = {
  'Google Groups': 'groups.google'
};

export const socialMediaIdentifiers = socialMediaNames.map(name => {
  return identifierOverrides[name] ?? name.toLowerCase();
});

const prefixOverrides: { [key: string]: string } = {
  'gitter'   : 'https://gitter.im/',
  'telegram' : 'https://t.me/'
};

export interface SocialMedia {
  identifier: string;
  name: string;
  prefix?: string;
}

export const socialMediaSites: SocialMedia[] = socialMediaIdentifiers.map((identifier, index) => ({
  identifier,
  name   : socialMediaNames[index],
  prefix : prefixOverrides[identifier] ?? `https://${identifier}.com/`
}));

export interface SocialMediaMap { [key: string]: SocialMedia }

export const buttonColor: { [key: string]: string } = {
  github          : 'black',
  gitlab          : 'orange',
  gitter          : 'pink',
  telegram        : 'blue',
  patreon         : 'red',
  vimeo           : 'teal',
  mastodon        : 'blue',
  flickr          : 'blue',
  xing            : 'teal',
  weibo           : 'red',
  'google groups' : 'blue'
};

export const socialMediaMap: SocialMediaMap = socialMediaIdentifiers.reduce((obj: SocialMediaMap, identifier, index) => {
  obj[identifier] = socialMediaSites[index];
  return obj;
}, {});

export const socialMediaExtraPrefixes = Object.values(socialMediaMap).reduce((obj: { [key: string]: string}, media: SocialMedia) => {
  obj[media.prefix ?? media.identifier] = `https://www.${media.identifier}.com/`;
  return obj;
}, {});
