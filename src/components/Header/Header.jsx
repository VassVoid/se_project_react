import "./Header.css";
import { Link } from "react-router-dom"; // ← new
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      {/* 1.  logo → home */}
      <Link to="/" className="header__logo-link">
        <img src={logo} alt="Logo Icon" className="header__logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add garment
      </button>

      {/* 2.  user → profile */}
      <Link to="/profile" className="header__user-link">
        <div className="header__user-container">
          <p className="header__username">William Mathurin</p>
          <img
            src={avatar}
            alt="Terrence Tegegene"
            className="header__avatar"
          />
        </div>
      </Link>
    </header>
  );
}

export default Header;
