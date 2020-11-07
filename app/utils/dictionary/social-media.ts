export const socialMediaNames = ['Twitter', 'Facebook', 'Instagram', 'Linkedin', 'YouTube', 'GitHub', 'GitLab', 'Patreon', 'Vimeo', 'Flicker', 'Google Groups', 'VK', 'Xing', 'Weibo'];

const identifierOverrides: { [key: string]: string } = {
  'Google Groups': 'groups.google'
};

export const socialMediaIdentifiers = socialMediaNames.map(name => {
  return identifierOverrides[name] ?? name.toLowerCase();
});

const prefixOverrides: { [key: string]: string } = {};

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

export const socialMediaMap: SocialMediaMap = socialMediaIdentifiers.reduce((obj: SocialMediaMap, identifier, index) => {
  obj[identifier] = socialMediaSites[index];
  return obj;
}, {});
