/**
 * Converts a degree value to its equivalent radian value.
 * @param degree The degree value to be converted to radian.
 * @returns The radian value equivalent to the input degree.
 */
export function degreeToRadian(degree: number): number {
  return degree * (Math.PI / 180);
}