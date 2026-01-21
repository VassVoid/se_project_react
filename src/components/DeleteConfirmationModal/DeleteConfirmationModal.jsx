import "./DeleteConfirmationModal.css";
import closeButton from "../../assets/close-button.svg";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null;

  return (
    <div className={isOpen ? "modal modal_opened" : "modal"}>
      <div className="modal__content modal__content_type_confirm">
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={closeButton}
            alt="Close Icon"
            className="modal__close-btn"
          />
        </button>
        <h2 className="modal__title">
          Are you sure you want to delete this item?
        </h2>
        <p className="modal__subtitle">This action is irreversible.</p>
        <div className="modal__buttons">
          <button
            className="modal__button modal__button_type_confirm"
            onClick={onConfirm}
          >
            Yes, delete item
          </button>
          <button
            className="modal__button modal__button_type_cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
