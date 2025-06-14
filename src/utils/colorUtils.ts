interface RGB {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): RGB | null {
  // Remove the hash if it exists
  hex = hex.replace(/^#/, "");

  // Parse the hex values
  const bigint = parseInt(hex, 16);
  if (isNaN(bigint)) return null;

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}
