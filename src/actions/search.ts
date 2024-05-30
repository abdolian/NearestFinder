'use server'

import { loadCountries, userLocation } from '@/actions';
import { Country } from "@/types";
import { calculateDistance } from '@/utils';

/**
 * Searches for countries based on a query and sorts them by distance from the user's location.
 * @param query The search query to filter countries by their names.
 * @returns An array of countries that match the query and are sorted by distance from the user's location.
 */
export async function search(query: string): Promise<Country[]> {
  // Loads countries
  const countries = await loadCountries();

  // Fetches the current user's location
  const location = await userLocation();

  // Filters countries based on the query
  const filtered = countries.filter((country) => {
    const name = country.name.trim().toLowerCase();

    const prefix = query.trim().toLowerCase();

    const found = name.startsWith(prefix);

    return found;
  });

  // Sorts the countries based on the distance to the current location
  var sorted = filtered.sort((a, b) => {
    const distanceA = calculateDistance(location.lat, location.lon, a.latlng[0], a.latlng[1]);
    const distanceB = calculateDistance(location.lat, location.lon, b.latlng[0], b.latlng[1]);
    return distanceA - distanceB;
  });

  return sorted;
} 