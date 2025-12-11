import { useEffect, useState } from "react";

import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  // Form values state
  const [formValues, setFormValues] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  // Form errors state
  const [formErrors, setFormErrors] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  // Check if form is valid
  const [isFormValid, setIsFormValid] = useState(false);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    // Reset form when closing
    setFormValues({ name: "", imageUrl: "", weather: "" });
    setFormErrors({ name: "", imageUrl: "", weather: "" });
    setIsFormValid(false);
  };

  // Validate individual field
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        } else if (value.trim().length > 30) {
          error = "Name must be less than 30 characters";
        }
        break;

      case "imageUrl":
        if (!value.trim()) {
          error = "Image URL is required";
        } else {
          // Basic URL validation
          const urlPattern = /^https?:\/\/.+\..+/i;
          if (!urlPattern.test(value.trim())) {
            error = "Please enter a valid URL";
          }
        }
        break;

      case "weather":
        if (!value) {
          error = "Please select a weather type";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form values
    const newFormValues = { ...formValues, [name]: value };
    setFormValues(newFormValues);

    // Validate the field
    const error = validateField(name, value);
    const newFormErrors = { ...formErrors, [name]: error };
    setFormErrors(newFormErrors);

    // Check if entire form is valid
    const isValid =
      newFormValues.name.trim() !== "" &&
      newFormValues.imageUrl.trim() !== "" &&
      newFormValues.weather !== "" &&
      !newFormErrors.name &&
      !newFormErrors.imageUrl &&
      !newFormErrors.weather;

    setIsFormValid(isValid);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submit
    const nameError = validateField("name", formValues.name);
    const imageUrlError = validateField("imageUrl", formValues.imageUrl);
    const weatherError = validateField("weather", formValues.weather);

    setFormErrors({
      name: nameError,
      imageUrl: imageUrlError,
      weather: weatherError,
    });

    // If any errors, don't submit
    if (nameError || imageUrlError || weatherError) {
      return;
    }

    // TODO: Add logic to save the new item
    console.log("Form submitted:", formValues);

    // Close modal after successful submission
    closeActiveModal();
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
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        isOpen={"add-garment" === activeModal}
        onClose={closeActiveModal}
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            name="name"
            placeholder="Name"
            value={formValues.name}
            onChange={handleInputChange}
            minLength={2}
            maxLength={30}
            required
          />
          {formErrors.name && (
            <span className="modal__error">{formErrors.name}</span>
          )}
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image URL
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
            value={formValues.imageUrl}
            onChange={handleInputChange}
            required
          />
          {formErrors.imageUrl && (
            <span className="modal__error">{formErrors.imageUrl}</span>
          )}
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              name="weather"
              type="radio"
              id="hot"
              value="hot"
              className="modal__radio-input"
              checked={formValues.weather === "hot"}
              onChange={handleInputChange}
            />{" "}
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              name="weather"
              id="warm"
              value="warm"
              type="radio"
              className="modal__radio-input"
              checked={formValues.weather === "warm"}
              onChange={handleInputChange}
            />{" "}
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              name="weather"
              id="cold"
              value="cold"
              type="radio"
              className="modal__radio-input"
              checked={formValues.weather === "cold"}
              onChange={handleInputChange}
            />{" "}
            Cold
          </label>
          {formErrors.weather && (
            <span className="modal__error">{formErrors.weather}</span>
          )}
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
        closeButton={closeActiveModal}
      />
    </div>
  );
}

export default App;
