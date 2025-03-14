import { useEffect, useRef } from "react";
import { Users } from "../../types/types";

interface ModalProps {
  user: Users;
  isOpen: boolean;
  closeModal: () => void;
}

export const Modal = ({ user, isOpen, closeModal }: ModalProps) => {
  const modalRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.classList.add("show");
      modalRef.current.style.display = "block";
      modalRef.current.focus();
    } else if (modalRef.current) {
      modalRef.current.classList.remove("show");
      modalRef.current.style.display = "none";
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={modalRef}
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden={!isOpen}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Detalles del Usuario
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Nombre:</strong> {user.name}
            </p>
            <p>
              <strong>Correo Electrónico:</strong> {user.email}
            </p>
            <p>
              <strong>Compañía:</strong> {user.company.name}
            </p>
            <p>
              <strong>Dirección:</strong> {user.address.street},{" "}
              {user.address.city}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
