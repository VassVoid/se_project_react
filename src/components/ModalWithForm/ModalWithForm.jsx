import "./ModalWithForm.css";
import closeButton from "../../assets/close-button.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  isOpen,
}) {
  return (
    <div className={isOpen ? "modal modal_opened" : "modal"}>
      {/* activeModal === "add-garment" is a hardcode inside universal ModalWithForm
      component, which can be used for any modal with a form in the future (not
      only for adding items). Please pass neutral isOpen into the props: isOpen=
      {activeModal === "add-garment"} */}
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={closeButton}
            alt="Close Icon"
            className="modal__close-btn"
          />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
