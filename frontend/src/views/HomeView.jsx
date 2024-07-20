import axios from "axios";
import { useEffect, useState } from "react";

const HomeView = () => {
    const [statePending, setStatePending] = useState(0);

    useEffect(() => {
        getStatePending();
    }, []);

    const getStatePending = async() => {
        const response = await axios.get('http://localhost:8000/planning/api/planning/state/pending');
        setStatePending(response.data["planning pending"]);
    }

    return (
        <div className='container mx-auto mt-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='md:col-span-2 lg:col-span-1'>
              <h2 className='text-center text-xl font-bold underline mb-4'>Planificaciones pendientes</h2>
              <ul>
                <li>Por preparar {statePending}</li>
                <li>Por registrar {statePending}</li>
              </ul>
          </div>
          <div className='md:col-span-2 lg:col-span-3 lg:ml-24'>
              <h2 className="text-center text-xl font-bold underline mb-4">Lista de tareas</h2>
          </div>
        </div>
      </div>
    );
}

export default HomeView;