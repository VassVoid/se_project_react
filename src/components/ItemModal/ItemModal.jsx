import "./ItemModal.css";
import closedButton from "../../assets/close-button.svg";

function ItemModal({ activeModal, OnClose, card, closeButton }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={OnClose} type="button" className="modal__close">
          <img src={closedButton} alt="" className="modal__close-btn_item" />
        </button>
        <img src={card.link} alt="" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
