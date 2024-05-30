'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

import { search } from "@/actions";
import { Autocomplete, Map } from "@/components";
import { Country } from "@/types";

export default function Home() {
  const [country, setCountry] = useState<Country>();

  const [countries, setCountries] = useState<Country[]>([]);

  const [error, setError] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setError('');

    if (!query.trim()) return setCountries([]);

    setLoading(true)

    search(query)
      .then(setCountries)
      .catch(() => {
        setError('Something went wrong. try again in a few seconds');
      })
      .finally(() => {
        setLoading(false)
      });
  }, [query])

  return (
    <main>
      <Autocomplete
        debounced={250}
        items={countries}
        loading={loading}
        keyProperty="name"
        valueProperty="name"
        onInput={setQuery}
        onSelect={setCountry}
      />

      {error && <p>{error}</p>}
      <p>Curious about which country is closest to where you are right now? Find out!</p>
      {country?.name}
      <p>© 2024 Nearest Finder. All Rights Reserved.</p>
      <p>Nearest Finder</p>
      {country && (
        <Map latitude={country.latlng[0]} longitude={country.latlng[1]} />
      )}
      <Image
        src="/logo.png"
        alt="Vercel Nearest Finder"
        width={100}
        height={100}
      />
    </main>
  );
}
