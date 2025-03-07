import { useEffect, useRef } from "react";
import "./Modal.css";

function ModalContent({ isOpen, onClose, children }) {
  // TODO: Implement click outside logic
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  // TODO: Implement escape key press logic

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" >
      <div className="modal-contentAdmin" ref={modalRef} role="dialog" aria-modal="true">
        <button className="close-button" aria-label="Close" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default ModalContent;
