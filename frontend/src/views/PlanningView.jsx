import PlanningList from '../components/Planning/PlanningList.jsx'
import PlanningFormComponent from '../components/Planning/PlanningFormComponent.jsx';
import StatePendingComponent from "../components/Home/StatePendingComponent";
import StatePreparedComponent from "../components/Home/StatePreparedComponent";

import usePlanningList from './../hooks/usePlanningList';
import useAuthenticatedUser from '../hooks/useAuthenticatedUser.jsx';

const PlanningView = ({ statePending, statePrepared }) => {
  const { plannings, listPlanning } = usePlanningList();
  const username = useAuthenticatedUser();

  return (
      <div className='container mx-auto mt-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='md:col-span-2 lg:col-span-1'>
            <h2 className='text-center text-xl font-bold underline mb-4'>Planificaciones pendientes</h2>
              <ul className="ml-16 mb-8">
                <StatePendingComponent statePending={statePending} />
                <StatePreparedComponent statePrepared={statePrepared} />    
              </ul>
              <div className="divider"></div>
              {username === 'responsable' && (
                <>
                <h2 className='text-center text-xl font-bold underline mb-4'>Añadir planificación</h2>
                <PlanningFormComponent refreshPlanningList={listPlanning}/>
                </>
              )}
          </div>
          <div className='md:col-span-2 lg:col-span-3 lg:ml-24'>
            <h2 className="text-center text-xl font-bold underline mb-4">Listado de Planificaciones</h2>
            <PlanningList plannings={plannings} showLink={true} showState={true} refreshPlanningList={listPlanning}/>
          </div>
        </div>
      </div>
  );
};

export default PlanningView;