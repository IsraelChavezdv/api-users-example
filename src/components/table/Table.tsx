import { useState } from "react";
import { Users } from "../../interface/Users";
import "./Table.css";
import { Modal } from "../modal/Modal";

type SelectedUser = Users | null;

interface TableProps {
  data: Users[];
}

export const Table = ({ data }: TableProps) => {
  const [selectedUser, setSelectedUser] = useState<SelectedUser>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchUser, setSearchUser] = useState<string>("");

  // Función optimizada fuera del JSX
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value);
  };

  const openModal = (user: Users) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
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
          onChange={handleSearchChange}
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

      {selectedUser && (
        <Modal
          user={selectedUser}
          isOpen={isModalOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
