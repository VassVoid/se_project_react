import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="Logo Icon" className="header__logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add garment
      </button>
      <div className="header__user-container">
        <p className="header__username">William Mathurin</p>
        <img src={avatar} alt="Terrence Tegegene" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
