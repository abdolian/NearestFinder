'use server'

import { loadCountries, userLocation } from '@/actions';
import { Country } from "@/types";
import { calculateDistance } from '@/utils';

/**
 * 
 * @param query 
 * @returns 
 */
export async function search(query: string): Promise<Country[]> {
  // Load countries
  const countries = await loadCountries();

  // User current location
  const location = await userLocation();

  // Filter countries based on the query
  const filtered = countries.filter((country) => {
    const name = country.name.trim().toLowerCase();

    const prefix = query.trim().toLowerCase();

    const found = name.startsWith(prefix);

    return found;
  });

  // Sort the array based on the distance to the current location
  var sorted = filtered.sort((a, b) => {
    const distanceA = calculateDistance(location.lat, location.lon, a.latlng[0], a.latlng[1]);
    const distanceB = calculateDistance(location.lat, location.lon, b.latlng[0], b.latlng[1]);
    return distanceA - distanceB;
  });

  return sorted;
} 