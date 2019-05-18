import palette from 'google-material-color';
import { random } from 'lodash';

export const getColor = (shades = ['600', '700', '800', '900']) => {
  let color = null;
  while (color === undefined || color === null || color === '') {
    color = palette.random(shades[random(0, 3)]);
  }
  return color;
};
