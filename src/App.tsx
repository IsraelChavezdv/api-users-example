import { Table } from "./components/table/Table";
import { useFetch } from "./hooks/useFetch";
import { Users } from "./types/types";

const url = "https://jsonplaceholder.typicode.com/users";

function App() {
  const { data, error, loading } = useFetch<Users[]>(url);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return <div className="container">{data && <Table data={data} />}</div>;
}
export default App;
