export const socialMediaNames = ['Twitter', 'Facebook', 'Instagram', 'Linkedin', 'YouTube', 'GitHub', 'GitLab', 'Gitter', 'Telegram', 'Patreon', 'Vimeo', 'Flickr', 'Google Groups', 'VK', 'Xing', 'Weibo'];

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
