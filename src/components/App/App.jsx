import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import { getItems, addItem, deleteItem } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);

  // Open the confirmation modal
  const handleDeleteClick = (card) => {
    setCardToDelete(card);
    setActiveModal("delete-confirm");
  };

  // Actually delete the card after confirmation
  const handleConfirmDelete = () => {
    if (!cardToDelete) return;

    deleteItem(cardToDelete._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((i) => i._id !== cardToDelete._id),
        );
        setCardToDelete(null);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard({});
    setCardToDelete(null);
  };

  const handleAddItemSubmit = (item, resetForm) => {
    const newItem = {
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weather,
    };

    addItem(newItem)
      .then((returnedItem) => {
        setClothingItems([returnedItem, ...clothingItems]);
        closeActiveModal();
        resetForm();
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItemSubmit}
          onCloseModal={closeActiveModal}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onDelete={handleDeleteClick}
        />
        <DeleteConfirmationModal
          isOpen={activeModal === "delete-confirm"}
          onClose={closeActiveModal}
          onConfirm={handleConfirmDelete}
          itemName={cardToDelete?.name}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
