import { tn } from '../text';

export const badgeSize = [
  {
    name       : '4 x 3 inch (101.6 x 76.2 mm)',
    height     : '4',
    lineHeight : '3',
    position   : 1
  },
  {
    name       : '4 x 6 inch (101.6 x 152.4 mm)',
    height     : '4',
    lineHeight : '6',
    position   : 2
  }
];

export const badgeOrientation = [
  {
    name     : tn.t('Portrait'),
    position : 1
  },
  {
    name     : tn.t('Landscape'),
    position : 2
  }
];
