import SunIcon from "../assets/images/weather/sun.png";
import CloudyIcon from "../assets/images/weather/cloudy.png";
import CloudIcon from "../assets/images/weather/cloud.png";
import BrokenCloudsIcon from "../assets/images/weather/broken_clouds.png";
import RainingIcon from "../assets/images/weather/raining.png";
import StormIcon from "../assets/images/weather/storm.png";
import SnowIcon from "../assets/images/weather/snowing.png";
import MistIcon from "../assets/images/weather/mist.png";

export const iconMaker = (iconCode: string) => {
  if (iconCode === "01n" || iconCode === "01d") return SunIcon;
  if (iconCode === "02n" || iconCode === "02d") return CloudyIcon;
  if (iconCode === "03n" || iconCode === "03d") return CloudIcon;
  if (iconCode === "04n" || iconCode === "04d") return BrokenCloudsIcon;
  if (iconCode === "09n" || iconCode === "09d") return RainingIcon;
  if (iconCode === "10n" || iconCode === "10d") return RainingIcon;
  if (iconCode === "11n" || iconCode === "11d") return StormIcon;
  if (iconCode === "13n" || iconCode === "13d") return SnowIcon;
  if (iconCode === "50n" || iconCode === "50d") return MistIcon;
  return SunIcon;
};
