import { useEffect, createContext } from "react";
import { getCurrentWeatherWithCoordApi } from "../api";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type {
  CityInterface,
  WeatherContextInterface,
  WeatherInterface,
} from "../type";

export const cities: CityInterface[] = [
  { id: 1, name: "Urmia", lat: "37.5527", lon: "45.0761" },
  { id: 2, name: "Tehran", lat: "35.6944", lon: "51.4215" },
];

export const defaultCity: CityInterface = cities[1];

const initWeather: WeatherInterface = {
  id: 801,
  name: "",
  description: "few clouds",
  main: "Clouds",
  icon: "02n",
  temp: "-6",
  humidity: "5",
  wind: "5",
  date: "Mon, 7th january",
};

export const ApiUrl: string = "https://api.openweathermap.org/data/2.5/weather";
export const ApiKey: string = "686a3a0e0306e673b8797bee08ebbed9";

export const WeatherContext = createContext<WeatherContextInterface>({
  city: defaultCity,
  setCity: () => {},
  weather: initWeather,
});

const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [city, setCity] = useLocalStorage<CityInterface>("city",defaultCity);
  const [weather, setWeather] = useLocalStorage<WeatherInterface>(
    "weather",
    initWeather
  );

  useEffect(() => {
    // console.log("Weather context useEffect");
    getFetchData();
  }, [city]);

  const getFetchData = async () => {
    const data = await getCurrentWeatherWithCoordApi(city);
    // console.log(data);
    const weather = data.weather[0];
    const { humidity, temp } = data.main;
    const { speed: wind } = data.wind;

    const date = new Date(data.dt).toLocaleDateString("en-us", {
      weekday: "short",
      day: "numeric",
      month: "long",
    });

    const newWeather: WeatherInterface = {
      name: data.name,
      ...weather,
      temp: temp.toFixed(1),
      humidity,
      wind,
      date,
    };
    setWeather(newWeather);
  };

  const setNewCity = (city: CityInterface) => {
    setCity(city);
  };

  return (
    <WeatherContext.Provider value={{ city, setCity: setNewCity, weather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
