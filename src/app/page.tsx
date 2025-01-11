import CountryList from "./components/CountryList";
import { fetchCountries } from "@/api";

export default async function Home() {
  const countries = await fetchCountries();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16 ">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full">
        <CountryList initialCountries={countries} />
      </main>
    </div>
  );
}
