import { useContext } from "react";
import { WeatherContext , cities ,defaultCity } from "../contexts/WeatherContext";
import type { WeatherContextInterface } from "../type";

export const useCity = () => {
  const weatherContext = useContext<WeatherContextInterface>(WeatherContext);
  if (!weatherContext) {
    throw new Error("Weather nor providered!");
  }

  return weatherContext.city;
};

export const useSetCity = () => {
  const weatherContext = useContext<WeatherContextInterface>(WeatherContext);
  if (!weatherContext) {
    throw new Error("Weather nor providered!");
  }

  return weatherContext.setCity;
};

const useWeather = () => {
  const weatherContext = useContext<WeatherContextInterface>(WeatherContext);
  if (!weatherContext) {
    throw new Error("Weather nor providered!");
  }

  return weatherContext.weather;
};
export {cities ,defaultCity}
export default useWeather;
