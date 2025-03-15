import { useState } from "react";
import { Users } from "../../interface/Users";
import "./Table.css";
import { Modal } from "../modal/Modal";

type selectedUser = Users | null;

interface TableProps {
  data: Users[];
}

export const Table = ({ data }: TableProps) => {
  const [userSelected, setUserSelected] = useState<selectedUser>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchUser, setSearchUser] = useState<string>("");

  const openModal = (user: Users) => {
    setUserSelected(user);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setUserSelected(null);
    setIsOpenModal(false);
  };

  const filteredUsers = searchUser
    ? data.filter((user) =>
        user.name.toLowerCase().includes(searchUser.toLowerCase())
      )
    : data;

  return (
    <>
      <h1 className="animated-title">Lista de Usuarios</h1>
      <div className="search-container">
        <label htmlFor="search">Buscar por Nombre:</label>
        <input
          type="text"
          id="search"
          placeholder=""
          className="search-input p-2 border rounded"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo Electrónico</th>
              <th>Compañía</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                onClick={() => openModal(user)}
                className="clickable-row"
              >
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {userSelected && (
        <Modal
          user={userSelected}
          isOpen={isOpenModal}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
