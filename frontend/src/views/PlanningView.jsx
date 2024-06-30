import PlanningList from '../components/Planning/PlanningList.jsx'
import PlanningFormComponent from '../components/Planning/PlanningFormComponent.jsx';

const PlanningView = () => {
  return (
      <div className='container mx-auto mt-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='md:col-span-2 lg:col-span-1'>
              <h2 className='text-center text-xl font-bold underline mb-4'>Añadir planificación</h2>
              <PlanningFormComponent />
          </div>
          <div className='md:col-span-2 lg:col-span-3 lg:ml-24'>
              <h2 className="text-center text-xl font-bold underline mb-4">Listado de Planificaciones</h2>
              <PlanningList />
          </div>
        </div>
      </div>
  )
}

export default PlanningView;