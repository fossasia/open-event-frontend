export function getLuma(hex: string): number {
  // https://stackoverflow.com/a/12043228/3309666
  const c = hex.toString().substring(1);    // strip #
  const rgb = parseInt(c, 16);   // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff;  // extract red
  const g = (rgb >>  8) & 0xff;  // extract green
  const b = (rgb >>  0) & 0xff;  // extract blue

  return 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
}

export function isLight(hex: string, threshold = 128): boolean {
  return getLuma(hex) > threshold;
}

export function isDark(hex: string, threshold = 128): boolean {
  return !isLight(hex, threshold);
}
