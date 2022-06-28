import { ApiUrl, ApiKey } from "../contexts/WeatherContext";
import type { CityInterface } from "../type";

export const getCurrentWeatherWithCoordApi = async (city: CityInterface) => {
  const response = await fetch(
    `${ApiUrl}?lat=${city.lat}&lon=${city.lon}&lang=en&&units=metric&appid=${ApiKey}`
  );
  const data = await response.json();
  return data;
};

export const getCurrentWeatherApi = async (cityName: string) => {
  const response = await fetch(
    `${ApiUrl}?q=${cityName}&appid=${ApiKey}`
  );
  const data = await response.json();
  return data;
};
