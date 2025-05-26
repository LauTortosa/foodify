import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
import { useStatePlanning } from "../hooks/useStatePlanning";
import EventsView from "./EventsView";
import TaskView from "./TaskView";

const HomeView = () => {
    const username = useAuthenticatedUser();
    const { statePending, statePrepared } = useStatePlanning();

    return (
        <div className='container mx-auto px-4 py-6 min-h-screen'>
            <div className=''>
                <h2>¡Hola {username}!</h2>
                <p>Hoy tienes {statePending} trabajos por preparar y {statePrepared} por registrar</p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
                <div className='lg:col-span-2 mt-6'>
                    <EventsView/>
                </div>
                <div className='lg:col-span-4 mt-10'>
                    <h2 className="text-xl font-bold underline mb-4">Tareas pendientes</h2>
                    <div className='overflow-x-auto'>
                        <TaskView />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeView;
