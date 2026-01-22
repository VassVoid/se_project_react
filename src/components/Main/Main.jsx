import { useContext } from "react";
import "./Main.css";
import "../../vendor/fonts.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit"; // ← FIXED: correct path and name

// A temporary helper function to use until you locate/import yours:
const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66 && temperature <= 85) {
    return "warm";
  } else if (temperature <= 65) {
    return "cold";
  }
};

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext); // ← FIXED: use lowercase variable

  // 1. FILTERING INPUT: Always use the Fahrenheit value (.F) from the state for consistent filtering
  const tempInFahrenheit = weatherData.temp.F;

  // 2. FILTERING OUTPUT: Convert the consistent Fahrenheit value to the weather category string
  const weatherType = getWeatherType(tempInFahrenheit);

  // 3. DISPLAY INPUT: Use the user's selected unit for presentation
  const displayTemp = weatherData.temp[currentTemperatureUnit]; // ← FIXED: use the value, not the context

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {displayTemp}°{currentTemperatureUnit} / You may want to
          wear: {/* ← FIXED */}
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherType;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
