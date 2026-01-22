import { useContext } from "react";
import "./Main.css";
import "../../vendor/fonts.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";

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
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);

  const tempInFahrenheit = weatherData.temp.F;

  const weatherType = getWeatherType(tempInFahrenheit);

  const displayTemp = weatherData.temp[currentTemperatureUnit];

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {displayTemp}°{currentTemperatureUnit} / You may want to
          wear:
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
