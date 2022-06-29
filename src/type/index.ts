export interface CoordInterface {
    lon: string;
    lat: string;
}

export interface WeatherInterface {
    id : number;
    name : string;
    description : string;
    main : string;
    icon : string;
    temp : string;
    humidity : string;
    wind : string;
    date : string;
}

export interface CityInterface extends CoordInterface {
    name : string;
}

export interface WeatherContextInterface {
    city : CityInterface;
    setCity : (city : CityInterface) => void;
    weather : WeatherInterface
}



