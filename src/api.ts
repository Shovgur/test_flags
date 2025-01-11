interface Country {
  name_ru: string;
  alpha2: string;
  flag_url: string;
}
export async function fetchCountries(): Promise<Country[]> {
  const url =
    "https://gist.githubusercontent.com/sanchezzzhak/8606e9607396fb5f8216/raw/39de29950198a7332652e1e8224f988b2e94b166/ISO3166_RU.json";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(
        "Failed to fetch countries",
        response.status,
        response.statusText
      );
      return [];
    }

    const data = await response.json();

    console.log("Fetched data:", data); // Логируем полученные данные

    if (!Array.isArray(data)) {
      console.error("Invalid data format:", data);
      return [];
    }

    return data
      .filter((country) => {
        console.log("Processing country:", country); // Логируем каждую страну
        if (
          !country ||
          typeof country.name_ru !== "string" ||
          typeof country.iso_code2 !== "string" ||
          typeof country.flag_url !== "string"
        ) {
          console.warn("Invalid country entry skipped:", country);
          return false;
        }

        return country.flag_url.startsWith("//");
      })
      .map((country) => ({
        name_ru: country.name_ru || "Unknown",
        alpha2: country.iso_code2 || "Unknown",
        flag_url: `https:${country.flag_url}`,
      }));
  } catch (error) {
    console.error("Error fetching or parsing countries:", error);
    return [];
  }
}
