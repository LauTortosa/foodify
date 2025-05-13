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
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-8 gap-8">
        
        <div className="md:col-span-2 lg:col-span-2 mt-10 ml-8">
          <h2 className="text-xl font-bold underline mb-4">Trabajo pendiente</h2>
          <StatePendingComponent statePending={statePending} />
          <StatePreparedComponent statePrepared={statePrepared} />
  
          {username === 'responsable' && (
            <>
              <h2 className="text-lg font-bold underline mb-4 mt-8">Acciones</h2>
              <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>
                Añadir planificación
              </button>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h2 className="text-xl text-center font-bold underline mb-4">Añadir planificación</h2>
                  <PlanningFormComponent refreshPlanningList={listPlanning} />
                </div>
              </dialog>
            </>
          )}
        </div>
  
        <div className="md:col-span-1 lg:col-span-6 mt-10 mr-20">
          <h2 className="text-center text-xl font-bold underline mb-4">Listado de Planificaciones</h2>
          <div className="overflow-x-auto">
            <PlanningList
              plannings={plannings}
              showLink={true}
              showState={true}
              refreshPlanningList={listPlanning}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningView;