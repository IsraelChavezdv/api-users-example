import { Table } from "./components";
import { Users } from "./interface/Users";
import { useFetch } from "./hooks/useFetch";
import { useState } from "react";

import Swal from "sweetalert2";

const url = "https://jsonplaceholder.typicode.com/users";

function App() {
  const { data, error, loading } = useFetch<Users[]>(url);
  const [controllerLoading, setControllerLoading] = useState(false);

  if (loading) {
    Swal.fire({
      title: "Cargando...",
      text: "Obteniendo los datos",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        setControllerLoading(true);
      },
    });
  }

  if (error) {
    setControllerLoading(false);
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
      confirmButtonText: "Cerrar",
    });
  }

  if (controllerLoading) {
    return <div className="container">{data && <Table data={data} />}</div>;
  }
}
export default App;
