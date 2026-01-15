import { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";


const params = {
  latitude: 39.665, // βάλε εσύ
  longitude: 20.853, // βάλε εσύ
  hourly: "temperature_2m",
};
const url = "https://api.open-meteo.com/v1/forecast";

export default function WeatherBadge() {
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];
        const hourly = response.hourly();
        if (!hourly) return;

        const temperature = hourly.variables(0)?.valuesArray()?.[0];
        setTemp(Math.round(temperature));
      } catch {
        setTemp(null);
      }
    };

    loadWeather();
  }, []);

  if (temp === null) return null;

  const icon = temp <= 5 ? "bi-cloud" : temp <= 15 ? "bi-cloud-sun" : "bi-sun";

  return (
    <div className="weather-badge d-flex align-items-center ms-3">
      <i className={`bi ${icon} me-1`}></i>
      <span>{temp}°C</span>
    </div>
  );
}
