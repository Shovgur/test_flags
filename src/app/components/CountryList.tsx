"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Country {
  name_ru: string;
  alpha2: string;
  flag_url: string;
}

interface CountryListProps {
  initialCountries: Country[];
}

export default function CountryList({ initialCountries }: CountryListProps) {
  const [countryList, setCountryList] = useState(initialCountries);

  const handleDelete = (alpha2: string) => {
    setCountryList((prev) =>
      prev.filter((country) => country.alpha2 !== alpha2)
    );
  };

  const handleImageError = (alpha2: string) => {
    setCountryList((prev) =>
      prev.filter((country) => country.alpha2 !== alpha2)
    );
  };

  return (
    <ul className="w-full max-w-md">
      <AnimatePresence>
        {countryList.map((country, index) => {
          const { name_ru, alpha2, flag_url } = country;

          const key =
            typeof alpha2 === "string" && alpha2.trim()
              ? alpha2
              : `${name_ru}-${index}`;

          return (
            <motion.li
              key={key}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between gap-4 p-4 mb-2 bg-white shadow-md rounded-md"
            >
              <div className="flex items-center relative gap-4">
                {flag_url && (
                  <Image
                    src={flag_url}
                    alt={name_ru}
                    width={40}
                    height={30}
                    className="w-[40px] h-[30px]"
                    onError={() => handleImageError(alpha2)}
                  />
                )}
                <span className="text-black">
                  {name_ru || "Unknown Country"}
                </span>
              </div>
              <button
                onClick={() => handleDelete(alpha2)}
                className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Удалить
              </button>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
}
