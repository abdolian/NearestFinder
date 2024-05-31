"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import classnames from "classnames";

import { search } from "@/actions";
import { Autocomplete, KeyValue, Map } from "@/components";
import { Country } from "@/types";

export default function Home() {
  const [country, setCountry] = useState<Country>();

  const [countries, setCountries] = useState<Country[]>([]);

  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [query, setQuery] = useState<string>("");

  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setError("");

    if (!query.trim()) return setCountries([]);

    setLoading(true);

    search(query)
      .then(setCountries)
      .catch(() => {
        setError("Something went wrong. try again in a few seconds");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query])

  return (
    <div className="min-h-screen">
      <div className="w-full container mx-auto p-6">
        <a className="flex items-center no-underline hover:no-underline" href="#">
          <Image
            className="pr-2"
            src="/logo.png"
            alt="Nearest Finder Logo"
            width={36}
            height={36}
          />
          <div className="text-rose-400 text-2xl">
            Nearest Finder
          </div>
        </a>
      </div>
      <div className={classnames({
        "container pt-36 px-6 mx-auto flex flex-wrap flex-col items-center": true,
        "animate-slide-up": !!country,
        "animate-slide-down": ready && !country
      })}>
        <h1 className="my-4 text-3xl md:text-5xl text-rose-500 font-bold leading-tight text-center ">
          Discover Your Nearest Country
        </h1>
        <p className="leading-normal text-base md:text-2xl text-center slide-in-bottom-subtitle">
          Find out which country is closest to you and explore its data
        </p>
        <div className="w-4/5 md:w-[28rem] lg:w-[30rem] xl:w-[32rem] py-16">
          <Autocomplete
            debounced={250}
            items={countries}
            loading={loading}
            keyProperty="name"
            valueProperty="name"
            onInput={(query) => {
              setQuery(country?.name == query ? "" : query);
            }}
            onSelect={(country) => {
              setCountry(country);
              setReady(true);
            }}
          />
          {error && <small className="text-red-500">{error}</small>}
        </div>
        <div className={classnames({
          "flex flex-col items-center gap-4 w-full lg:flex-row xl:w-8/12": true,
          "animate-fade-in": !!country
        })} >
          <div className="w-full lg:w-1/2 shadow-xl">
            {country && (
              <Map latitude={country.latlng[0]} longitude={country.latlng[1]} />
            )}
          </div>
          <div className="w-full lg:w-1/2 shadow-xl">
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
          </div>
        </div>
      </div>
      <div className="fixed p-3 bottom-0 right-0">
        <a className="text-gray-500 no-underline hover:no-underline" href="#">© 2024 Nearest Finder</a>
      </div>
    </div>
  );
}
