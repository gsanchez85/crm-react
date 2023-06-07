import { Form, useActionData, useLoaderData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import { editarCliente, obtenerCliente } from "../data/Clientes";
import Volver from "../utils/Volver";
import Error from "../components/Error";

export async function loader({params}) {
  const cliente = await obtenerCliente(params.clienteId);
  if (Object.values(cliente).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: `El cliente ${params.clienteId} no existe`
    })
  }
  return cliente;
};

export async function action({request, params}) { 
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = formData.get("email");
  // Validación
  const errores = [];
  if (Object.values(datos).includes(''))
    errores.push('Todos los campos son obligatorios');
  // Expresión regular para validar email
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if (!!email && !regex.test(email))
    errores.push('El email no es válido');
  // Devuelve datos si hay errores
  if (Object.keys(errores).length)
    return errores;
  //  
  await editarCliente(params.clienteId, datos);
  return redirect('/');  // redirect es más recomendado para action y loader
};

const EditarCliente = () => {
  const cliente = useLoaderData();
  const errores = useActionData();

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar cliente</h1>
      <p className='mt-3 font-black'>Recuerde que todos los campos son obligatorios</p>
      <Volver/>

      <div className="bg-white shadow rounded-md md:w-3/4 px-5 py-10">
        { errores?.length && errores.map( (error, i) => <Error key={i}>{error}</Error> )}
        <Form 
          method='put'
          noValidate>
          <Formulario cliente={cliente}/>
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 rounded-md p-3 uppercase font-bold text-white text-lg hover:bg-blue-900 cursor-pointer"
            value="Modificar cliente"/>
        </Form>
      </div>
    </>
  )
};

export default EditarCliente;