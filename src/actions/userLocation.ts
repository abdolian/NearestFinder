"use server"

/**
 * The structure of a user's location data.
 */
export interface UserLocation {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

/**
 * Fetches the current user's location data.
 * @returns A Promise that resolves to a location object.
 */
export async function userLocation(): Promise<UserLocation> {
  const response = await fetch("http://ip-api.com/json");

  const location = await response.json() as UserLocation;

  return location;
}