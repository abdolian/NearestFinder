'use client'

import { useEffect, useState } from "react";

import { search } from "@/actions";
import { Autocomplete } from "@/components";
import { Country } from "@/types";

export default function Home() {
  const [country, setCountry] = useState<Country>();

  const [countries, setCountries] = useState<Country[]>([]);

  const [error, setError] = useState<string>('');

  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setError('');

    if (!query.trim()) return;

    search(query)
      .then(setCountries)
      .catch(() => {
        setError('Something went wrong. try again in a few seconds');
      });
  }, [query])

  return (
    <main>
      <Autocomplete
        debounced={250}
        items={countries}
        keyProperty="name"
        valueProperty="name"
        onInput={setQuery}
        onSelect={setCountry}
      />
      {error && <p>{error}</p>}
      {query} - {country?.name}
    </main>
  );
}
