"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

import { search } from "@/actions";
import { Autocomplete, KeyValue, Map } from "@/components";
import { Country } from "@/types";

export default function Home() {
  const [country, setCountry] = useState<Country>();

  const [countries, setCountries] = useState<Country[]>([]);

  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setError("");

    if (!query.trim()) return setCountries([]);

    setLoading(true)

    search(query)
      .then(setCountries)
      .catch(() => {
        setError("Something went wrong. try again in a few seconds");
      })
      .finally(() => {
        setLoading(false)
      });
  }, [query])

  return (
    <div className="h-screen pb-14 bg-right bg-cover" data-style="background-image:url(bg.svg);">
      <div className="w-full container mx-auto p-6">
        <div className="w-full flex items-center justify-between">
          <a className="flex items-center no-underline hover:no-underline" href="#">
            <Image
              className="pr-2"
              src="/logo.png"
              alt="Nearest Finder Logo"
              width={42}
              height={42}
            />
            <div className="text-rose-400 text-2xl lg:text-3xl">
              Nearest Finder
            </div>
          </a>
        </div>
      </div>
      <div className="container pt-24 md:pt-48 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1 className="my-4 text-3xl md:text-5xl text-rose-500 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
            Discover Your Nearest Country
          </h1>
          <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle">
            Find out which country is closest to you and explore its data
          </p>
        </div>
        <div className="w-full xl:w-3/5 py-6">
          <div>
            <Autocomplete
              debounced={250}
              items={countries}
              loading={loading}
              keyProperty="name"
              valueProperty="name"
              onInput={(query) => {
                setQuery(country?.name == query ? "" : query);
              }}
              onSelect={setCountry}
            />
            {error && <small className="text-red-500">{error}</small>}
          </div>
          {country && (
            <KeyValue
              title="Details"
              items={[
                ["Name", country.name],
                ["Capital", country.capital],
                ["Region", country.region],
                ["Population", country.population],
                ["Flag", <Image src={country.flag} alt={country.name} width={48} height={32} />],
              ]}
            />
          )}

          {country && (
            <Map latitude={country.latlng[0]} longitude={country.latlng[1]} />
          )}
        </div>
        <div className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
          <a className="text-gray-500 no-underline hover:no-underline" href="#">© 2024 Nearest Finder. All Rights Reserved.</a>
        </div>
      </div>
    </div>
  );
}
