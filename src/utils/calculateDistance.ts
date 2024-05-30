import { degreeToRadian } from "@/utils";

/**
 * Calculate the distance between two points on the Earth's surface using the Haversine formula.
 * 
 * @param latitude1 - The latitude of the first point in degrees.
 * @param longitude1 - The longitude of the first point in degrees.
 * @param latitude2 - The latitude of the second point in degrees.
 * @param longitude2 - The longitude of the second point in degrees.
 * @returns The distance between the two points in kilometers.
 */
export function calculateDistance(latitude1: number, longitude1: number, latitude2: number, longitude2: number): number {
  // Radius of the Earth in kilometers
  const R = 6371;

  // Convert latitude and longitude from degrees to radians
  const latitude = degreeToRadian(latitude2 - latitude1);
  const longitude = degreeToRadian(longitude2 - longitude1);

  // Apply the Haversine formula
  const a =
    Math.sin(latitude / 2) * Math.sin(latitude / 2) +
    Math.cos(degreeToRadian(latitude1)) * Math.cos(degreeToRadian(latitude2)) *
    Math.sin(longitude / 2) * Math.sin(longitude / 2);

  // Calculate the angular distance in radians
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance in kilometers
  const distance = R * c;

  return distance;
}