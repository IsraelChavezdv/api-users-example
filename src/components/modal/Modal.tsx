import { useEffect, useRef } from "react";
import { Users } from "../../interface/Users";

interface ModalProps {
  user: Users;
  isOpen: boolean;
  closeModal: () => void;
}

export const Modal = ({ user, isOpen, closeModal }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.classList.add("show");
      modalRef.current.style.display = "block";
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
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden={!isOpen}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Detalles del Usuario
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body text-center">
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
            <p>
              <strong>Sitio Web:</strong> {user.website}
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
            {/* Aquí puedes agregar más botones si es necesario */}
          </div>
        </div>
      </div>
    </div>
  );
};
