import { Users } from "../../types/types";
import "./Table.css";

interface TablaProps {
  data: Users[]; // Usamos la interfaz Users aquí
}

export const Table = ({ data }: TablaProps) => {
  return (
    <div className="container">
      <h1 className="">Lista de Usuarios</h1>
      <table className="">
        <thead>
          <tr className="">
            <th className="">Nombre</th>
            <th className="">Correo Electrónico</th>
            <th className="">Compañía</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user.id} className="">
              <td className="">{user.name}</td>
              <td className="">{user.email}</td>
              <td className="">{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
