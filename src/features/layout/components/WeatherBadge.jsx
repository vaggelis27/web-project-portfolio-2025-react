import { useEffect, useState } from "react";
const params = new URLSearchParams({
  latitude: "39.6649",
  longitude: "20.8519",
  current: "temperature_2m",
});
const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

export function WeatherBadge() {
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather request failed");
        const data = await response.json();
        const temperature = data?.current?.temperature_2m;
        if (typeof temperature !== "number") throw new Error("No temperature");
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
    <div className="weather-badge d-flex align-items-center ms-3 bg-light px-2 py-0 rounded">
      <i className={`bi ${icon} me-1`}></i>
      <span>{temp}°C</span>
    </div>
  );
}
