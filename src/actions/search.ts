'use server'

import { promises as fs } from 'fs';

import { Country } from "@/types";
import { userLocation } from './userLocation';


let countries: Country[] = [];

async function load(): Promise<Country[]> {
  if (countries.length) return countries;

  const address = process.cwd() + '/src/data/countries.json';

  const content = await fs.readFile(address, 'utf8');

  countries = JSON.parse(content);

  return countries;
}

export async function search(query: string): Promise<Country[]> {
  const countries = await load();
  const location = await userLocation();

  const filtered = countries.filter((country) => {
    const name = country.name.trim().toLowerCase();
    const prefix = query.trim().toLowerCase()
    const found = name.startsWith(prefix);
    return found;
  });




  // Your array of coordinates
  const coordinates = [
    { lat: 34.0522, lon: -118.2437 }, // Los Angeles
    { lat: 40.7128, lon: -74.0060 },  // New York
    { lat: 37.7749, lon: -122.4194 }, // San Francisco
    // Add more coordinates as needed
  ];

  // Your current location
  //  const currentLocation = { lat: 36.7783, lon: -119.4179 }; // Example: somewhere in California

  // Sort the array based on the distance to the current location
  var a = filtered.sort((a, b) => {
    const distanceA = getDistanceFromLatLonInKm(location.lat, location.lon, a.latlng[0], a.latlng[1]);
    const distanceB = getDistanceFromLatLonInKm(location.lat, location.lon, b.latlng[0], b.latlng[1]);
    return distanceA - distanceB;
  });

  console.log(a);


  return filtered;
}

// Define the Haversine formula to calculate the distance between two points
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);  // Convert degrees to radians
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

// Convert degrees to radians
function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}