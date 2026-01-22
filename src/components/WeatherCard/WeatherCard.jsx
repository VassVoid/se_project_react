import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit"; // ← FIXED: lowercase 'c'
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext); // ← FIXED: lowercase variable

  const filteredOptions = weatherOptions.filter(
    (o) => o.day === weatherData.isDay && o.condition === weatherData.condition,
  );
  const weatherOption =
    filteredOptions.length === 0
      ? defaultWeatherOptions[weatherData.isDay ? "day" : "night"]
      : filteredOptions[0];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}° {currentTemperatureUnit}{" "}
        {/* ← FIXED: use the value */}
      </p>
      <img
        src={weatherOption?.url}
        alt={`${weatherOption?.day ? "day" : "night"} ${
          weatherOption?.condition
        }`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
