import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../hooks/CurrentTemperatureUnit";
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const { CurrentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

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
        {weatherData.temp[CurrentTemperatureUnit]}° {CurrentTemperatureUnit}
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
