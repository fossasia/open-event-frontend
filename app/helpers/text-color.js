import Helper from '@ember/component/helper';

const colorForLightBackground = '#000000';
const colorForDarkBackground = '#FFFFFF';

const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const longRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

function hexToRgb(hex) {
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });
  const result = longRegex.exec(hex);
  return result ? {
    r : parseInt(result[1], 16),
    g : parseInt(result[2], 16),
    b : parseInt(result[3], 16)
  } : null;
}

function colourIsLight(r, g, b) {
  const a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return (a < 0.5);
}

export function textColor(params) {
  if (!params[0]) {
    return colorForLightBackground;
  }

  const rgb = hexToRgb(params[0]);
  if (!rgb) {
    return colorForLightBackground;
  }

  return colourIsLight(rgb.r, rgb.g, rgb.b) ? colorForLightBackground : colorForDarkBackground;
}

export default Helper.helper(textColor);
