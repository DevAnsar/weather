import { useState, useEffect, Fragment } from "react";
import {
  MenuIcon,
  HeartIcon,
  CheckIcon,
  SelectorIcon,
} from "@heroicons/react/solid";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import WindSpeedIcon from "./assets/images/icons/wind_speed.png";
import waterIcon from "./assets/images/icons/water.png";
import useWeather, { useCity, useSetCity, cities } from "./hooks/useWeather";
import { iconMaker } from "./utils/helper";
import DarkModeToggleButton from "./components/tools/DarkModeToggleButton";
import { Dialog, Transition, Combobox } from "@headlessui/react";
import type { CityInterface } from "./type";

function App() {
  const city = useCity();
  const setCity = useSetCity();
  const weather = useWeather();
  const [cityModal, setCityModal] = useState<boolean>(false);

  // const handleToDefaultCity = () => setCity(defaultCity);
  const handleGoMyLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      alert(err.message);
    }

    if (navigator)
      navigator.geolocation.getCurrentPosition(
        (pos: any) => {
          const crd = pos.coords;
          setCity({
            name: "My location",
            lat: crd.latitude,
            lon: crd.longitude,
          });
        },
        error,
        options
      );
  };

  return (
    <>
      <ChoseCityDialog
        isOpen={cityModal}
        setIsOpen={setCityModal}
        selectedCity={city}
      />
      <div className="h-screen w-screen grid grid-cols-1 grid-rows-8 bg-gradient-to-b from-white dark:from-slate-800  to-cyan-200 dark:to-black">
        <header className="col-span-1 row-span-1 px-5">
          <div className=" flex justify-between items-center self-center h-full">
            <div className=" flex flex-row ">
              <div className="flex item-center">
                <MenuIcon className="w-8 text-teal-600 dark:text-slate-50" />
              </div>
              <div className="flex items-center">
                <a
                  href="https://ansarmirzayi.ir"
                  className="text-teal-600 dark:text-slate-50 text-lg mx-5"
                >
                  Wheather
                </a>
              </div>
            </div>
            <DarkModeToggleButton />
          </div>
        </header>

        <div className="col-span-1 row-span-4 px-5">
          <div className=" flex flex-col h-full">
            <div className="flex justify-center mt-10">
              {/* <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="" className="w-48 h-48" /> */}
              <img src={iconMaker(weather.icon)} alt="" className="w-48 h-48" />
            </div>
            <div className="flex justify-center mt-5">
              <LocationMarkerIcon className="w-6 text-orange-500 dark:text-yellow-600" />
              <span className="text-orange-500 dark:text-yellow-600 text-2xl font-bold">
                {weather.name}
              </span>
            </div>
            <div className="flex justify-center mt-1">
              <span className="text-teal-600 dark:text-slate-50 text-7xl">
                {weather.temp}°C
              </span>
            </div>
            <div className="flex justify-center mt-2">
              <span className="text-orange-500 dark:text-yellow-600 text-md font-bold">
                {weather.date}
              </span>
            </div>
            <div className="flex justify-center mt-0">
              <span className="text-teal-600 dark:text-blue-500 text-3xl">
                {weather.description}
              </span>
            </div>
            <div className="flex w-full justify-center">
              <div className="max-w-md min-w-[400px]">
                <div className=" flex flex-row justify-between px-5 mt-10">
                  <div className="flex flex-col item-center">
                    <img src={waterIcon} alt="" className="w-7 h-7" />
                    <div className="flex items-center text-teal-600 dark:text-slate-50">
                      <span className="text-lg">{weather.humidity}</span>
                      <span className="text-md">%</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src={WindSpeedIcon} alt="" className="w-7 h-7" />
                    <div className="flex items-center text-teal-600 dark:text-slate-50">
                      <span className="text-lg">{weather.wind}</span>
                      <span className="text-md">m/s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 row-span-2 px-5">
          <div className="flex w-full justify-center">
            <div className="max-w-md min-w-[400px]">
              <div className=" flex flex-row justify-between  self-center content-center">
                <div className="flex item-center">
                  <button
                    onClick={() => setCityModal(true)}
                    className="flex justify-center items-center border-2 border-orange-400 dark:border-yellow-600 text-white dark:text-slate-900 bg-orange-400 dark:bg-yellow-600 rounded-full px-5 py-1"
                  >
                    <span>chose city</span>
                  </button>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={handleGoMyLocation}
                    className="border-2 border-orange-400 dark:border-yellow-600 text-slate-500 dark:text-slate-50  rounded-full px-5 py-1"
                  >
                    my location
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 row-span-1 px-5">
          <div className=" flex flex-row justify-center">
            <div className="flex item-center text-slate-800 dark:text-slate-50">
              made with
              <HeartIcon className="w-5 text-red-500" />
              by
              <a
                href="https://ansarmirzayi.ir"
                className="w-7 text-teal-600 dark:text-blue-500 mx-1"
              >
                {" "}
                Dev_Ansar{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

const ChoseCityDialog = ({
  isOpen,
  setIsOpen,
  selectedCity,
}: {
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
  selectedCity: CityInterface;
}) => {
  const setCity = useSetCity();
  const [sc, setSelectedCity] = useState(selectedCity);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setCity(sc);
  }, [sc]);
  const filteredCities =
    query === ""
      ? cities
      : cities.filter((city) =>
          city.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white dark:bg-slate-700 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-slate-50"
                >
                  Chose city
                </Dialog.Title>
                <div className="mt-2">
                  <Combobox value={sc} onChange={setSelectedCity}>
                    <div className="relative mt-1">
                      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white dark:bg-gray-900 text-left shadow-md outline-none sm:text-sm">
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-slate-50 outline-none"
                          displayValue={(city: { name: string }) => city.name}
                          onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <SelectorIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                      >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-400 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredCities.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-slate-50">
                              Nothing found.
                            </div>
                          ) : (
                            filteredCities.map((city) => (
                              <Combobox.Option
                                key={city.name + city.lat}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-teal-600 text-slate-50"
                                      : "text-gray-900 dark:text-slate-50"
                                  }`
                                }
                                value={city}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {city.name}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-teal-600"
                                        }`}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Got it!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
