export interface City {
    id: number
        name: string
        state: string
        country: string
        coord: {
            lon: number,
            lat: number
        }
}

export interface CityData {
  country: string;
  lat: number;
  local_names: {
    ar: string;
    be: string;
    ca: string;
    cs: string;
    de: string;
    el: string;
    en: string;
    eo: string;
    es: string;
    et: string;
    fa: string;
    fi: string;
    fr: string;
    he: string;
    hi: string;
    hr: string;
    hu: string;
    hy: string;
    io: string;
    it: string;
    ja: string;
    ka: string;
    kn: string;
    ko: string;
    ku: string;
    lt: string;
    ml: string;
    nl: string;
    nn: string;
    no: string;
    oc: string;
    pl: string;
    pt: string;
    ro: string;
    ru: string;
    sk: string;
    sl: string;
    sr: string;
    sv: string;
    uk: string;
    ur: string;
    yi: string;
    zh: string;
  };
  lon: number;
  name: string;
  state: string;
}

export interface weatherCurrent {
    current: {
        apparent_temperature: number
        interval: number
        precipitation: number
        relative_humidity_2m: number
        temperature_2m: number
        time: string
        weather_code: number
        wind_speed_10m: number
    },
    current_units: {
        apparent_temperature: string
        interval: string
        precipitation: string
        relative_humidity_2m: string
        temperature_2m: string
        time: string
        weather_code: string
        wind_speed_10m: string
    },
    elevation: number
    generationtime_ms: number
    latitude: number
    longitude: number
    timezone: string
    timezone_abbreviation: string
    utc_offset_seconds: number
}

export interface dailyWeather {
    daily: {
        time: string[]
        weathercode: number[]
        temperature_2m_max: number[]
        temperature_2m_min: number[]
    }
}