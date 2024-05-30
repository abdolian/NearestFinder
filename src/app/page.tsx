'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

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

    if (!query.trim()) return setCountries([]);

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
      <p>Curious about which country is closest to where you are right now? Find out!</p>
      {query} - {country?.name}
      <p>© 2024 Nearest Finder. All Rights Reserved.</p>
      <p>Nearest Finder</p>
      <Image
        src="/logo.png"
        alt="Vercel Nearest Finder"
        width={100}
        height={100}
      />
    </main>
  );
}
