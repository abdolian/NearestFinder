"use server"

import { promises as fs } from "fs";

import { Country } from "@/types";

const COUNTRIES_SOURCE_FILE = process.cwd() + "/src/data/countries.json";

let cache: Country[] = [];

/**
 * Loads the list of countries from the source file.
 * @returns A Promise that resolves to an array of country objects.
 */
export async function loadCountries(): Promise<Country[]> {
  if (cache.length) return cache;

  const content = await fs.readFile(COUNTRIES_SOURCE_FILE, "utf8");

  cache = JSON.parse(content);

  return cache;
} 