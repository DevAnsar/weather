import SunIcon from "../assets/images/weather/sun.png";
import CloudyIcon from "../assets/images/weather/cloudy.png";
import CloudIcon from "../assets/images/weather/cloud.png";
import BrokenCloudsIcon from "../assets/images/weather/broken_clouds.png";
import RainingIcon from "../assets/images/weather/raining.png";
import StormIcon from "../assets/images/weather/storm.png";
import SnowIcon from "../assets/images/weather/snowing.png";
import MistIcon from "../assets/images/weather/mist.png";

export const iconMaker = (iconCode: string) => {
    switch (iconCode) {
      case "01n" || "01d": {
        return SunIcon;
      }
      case "02n" || "02d": {
        return CloudyIcon;
      }

      case "03n" || "03d": {
        return CloudIcon;
      }

      case "04n" || "04d": {
        return BrokenCloudsIcon;
      }

      case "09n" || "09d": {
        return RainingIcon;
      }

      case "10n" || "10d": {
        return RainingIcon;
      }

      case "11n" || "11d": {
        return StormIcon;
      }

      case "13n" || "13d": {
        return SnowIcon;
      }

      case "50n" || "50d": {
        return MistIcon;
      }
      default: {
        return SunIcon;
      }
    }
  };