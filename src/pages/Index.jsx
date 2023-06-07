
import { useLoaderData } from "react-router-dom";
import Cliente from "../components/Cliente";
import { obtenerClientes } from "../data/Clientes";

// No es lo mismo que useEffect pero es similar. Es una función que se va a ejecutar cuando el componente cargue
export function loader() {
   // Para ver las variables de entorno (estamos trabajando con VITE, por lo que las variables de entorno tienen que empezar por VITE_*):
   // console.log(import.meta.env); 
   const clientes = obtenerClientes();  
   return clientes;
}

const index = () => {

  // useLoaderDate: cuando se quiere obtener el resultado de un loader  
  const clientes = useLoaderData();
 
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3 font-black'>Administra tus clientes</p>
      {clientes.length ? (
       <table className="w-full bg-white shadow mt-5 table-auto">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="p-2">Cliente</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Acciones</th>            
          </tr>
        </thead>
        <tbody>
          { clientes.map( c => (
            <Cliente 
              cliente={c} 
              key={c.id}/>
          ))}
        </tbody>
       </table>  
      ) : (
        <p className='text-center mt-10'>No hay ningún cliente</p>
      )}
    </>
  )
};

export default index;