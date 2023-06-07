import { useNavigate } from "react-router";

const Volver = () => {

  const navigate = useNavigate();

  return (
    <div className="flex justify-end">
     <button 
       className="bg-blue-800 rounded-lg text-white px-3 py-1 font-bold hover:bg-blue-900"
       onClick={() => navigate(-1)}>
       {`< Volver`}
     </button>
  </div>
  )
}

export default Volver