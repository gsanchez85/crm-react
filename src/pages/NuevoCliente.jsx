import { Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Volver from "../utils/Volver";
import Error from "../components/Error";
import { agregarCliente } from "../data/Clientes";

// request: petición que está realizando hacia el action
export async function action({request}) { 
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = formData.get("email");
  // Validación
  //console.log(datos);
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
  await agregarCliente(datos);
  return redirect('/');  // redirect es más recomendado para action y loader
};

const NuevoCliente = () => {

  // useActionData: cuando se quiere obtener el resultado de un action
  const errores = useActionData();

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Nuevo cliente</h1>
      <p className='mt-3 font-black'>Llena todos los campos para registrar un nuevo cliente</p>
      <Volver/>

      <div className="bg-white shadow rounded-md md:w-3/4 px-5 py-10">
        { errores?.length && errores.map( (error, i) => <Error key={i}>{error}</Error> )}
        <Form 
          method='post'
          noValidate>
          <Formulario cliente={{}}/>
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 rounded-md p-3 uppercase font-bold text-white text-lg hover:bg-blue-900 cursor-pointer"
            value="Registrar cliente"/>
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente