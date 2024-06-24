import PlanningList from '../components/Planning/PlanningList.jsx'
import PlanningFormComponent from '../components/Planning/PlanningFormComponent.jsx';

const PlanningView = () => {
    return (
        <div>
          <div className='grid grid-cols-4 p-4 mt-10'>
            <div className='mr-8'>
                <h2 className='text-center text-xl font-bold underline mb-4'>Añadir planificación</h2>
                <PlanningFormComponent />
            </div>
            <div className='col-span-3'>
                <h2 className="text-center text-xl font-bold underline mb-4">Listado de Planificaciones</h2>
                <PlanningList />
            </div>
          </div>
        </div>
    )
}

export default PlanningView;