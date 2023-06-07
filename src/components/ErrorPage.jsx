import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();

    return (
      <div className='space-y-8'>
         <h1 className='bg-red-100 rounded-md text-center text-6xl font-extrabold mt-10 text-blue-800'>CRM - Clientes</h1>
         <p className='text-center text-2xl font-bold text-red-900'>Hubo un error</p>
         <p className='text-center font-bold'>{error.statusText || error.message}</p>
         <p className='text-center pt-20'>Póngase en contacto con el administrador/a de la APP</p>
      </div>
    );
}