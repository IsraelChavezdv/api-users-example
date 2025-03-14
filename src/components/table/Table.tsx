import { useState } from "react";
import { Users } from "../../types/types";
import "./Table.css";
import { Modal } from "../modal/Modal";

interface TableProps {
  data: Users[]; // Usamos la interfaz Users aquí
}

export const Table = ({ data }: TableProps) => {
  const [userSelected, setUserSelected] = useState<Users | null>(null);
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
      <h1 className="">Lista de Usuarios</h1>
      <input
        type="text"
        placeholder="Buscar por nombre"
        className="mb-4 p-2 border rounded"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
      />
      <table className="">
        <thead>
          <tr className="">
            <th className="">Nombre</th>
            <th className="">Correo Electrónico</th>
            <th className="">Compañía</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user.id}
              onClick={() => openModal(user)}
              className="clickable-row"
            >
              <td className="">{user.name}</td>
              <td className="">{user.email}</td>
              <td className="">{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
