import { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";

const params = {
  latitude: 52.52,
  longitude: 13.41,
  hourly: "temperature_2m",
};
const url = "https://api.open-meteo.com/v1/forecast";

const buildWeatherData = (response) => {
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const hourly = response.hourly();
  if (!hourly) return null;

  return {
    coords: {
      latitude: response.latitude(),
      longitude: response.longitude(),
      elevation: response.elevation(),
      utcOffsetSeconds,
    },
    hourly: {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000
          )
      ),
      temperature_2m: hourly.variables(0)?.valuesArray() ?? [],
    },
  };
};

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadWeather = async () => {
      try {
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];
        const data = buildWeatherData(response);
        if (isMounted) setWeatherData(data);
      } catch (err) {
        if (isMounted) setError(err?.message || "Failed to load weather");
      }
    };

    loadWeather();

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) return <p>Weather error: {error}</p>;
  if (!weatherData) return <p>Loading weather...</p>;

  const { coords, hourly } = weatherData;

  return (
    <div>
      <p>
        Coords: {coords.latitude}°N {coords.longitude}°E, Elevation:{" "}
        {coords.elevation}m
      </p>
      <p>Timezone offset: {coords.utcOffsetSeconds}s</p>
      <p>
        First temperature:{" "}
        {hourly.temperature_2m.length ? hourly.temperature_2m[0] : "n/a"}°C
      </p>
    </div>
  );
}
