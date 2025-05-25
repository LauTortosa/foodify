import { useState } from 'react';
import PlanningList from '../components/Planning/PlanningList.jsx'
import PlanningRegisteredView from './PlanningRegisteredView.jsx';
import usePlanningList from './../hooks/usePlanningList';
import useAuthenticatedUser from '../hooks/useAuthenticatedUser.jsx';
import PlanningFormComponent from '../components/Planning/PlanningFormComponent.jsx';
import StatePendingComponent from "../components/Home/StatePendingComponent";
import StatePreparedComponent from "../components/Home/StatePreparedComponent";
import PlanningDetailsComponent from "../components/PlanningDetails/PlanningDetailsComponent.jsx"

const PlanningView = ({ statePending, statePrepared }) => {
  const { plannings, listPlanning } = usePlanningList();
  const username = useAuthenticatedUser();
  const [view, setView] = useState("list");
  const [selectedPlanningId, setSelectedPlanningId] = useState(null);

  const showPlanningDetails = (id) => {
    setSelectedPlanningId(id);
    setView("details");
  };

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-8">
        
        <div className="lg:col-span-2">
          <h2 className="text-md font-bold underline mb-4">Trabajo pendiente</h2>
          <StatePendingComponent statePending={statePending} />
          <StatePreparedComponent statePrepared={statePrepared} />
  
          {username === 'responsable' && (
            <>
              <h2 className="text-md font-bold underline mb-4 mt-8">Acciones</h2>
              <div className="flex flex-col gap-2">
                <button className="btn btn-sm w-40" onClick={() => document.getElementById('my_modal_3').showModal()}>
                  Añadir trabajo
                </button>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h2 className="text-xl text-center font-bold underline mb-4">Añadir trabajo</h2>
                    <PlanningFormComponent refreshPlanningList={listPlanning} />
                  </div>
                </dialog>

                <button className="btn btn-sm w-40" onClick={() => setView("diary")}>
                  Diario de trabajos
                </button>
                <button className="btn btn-sm w-40" onClick={() => setView("list")}>
                  Listado de trabajos
                </button>
              </div>
              
            </>
          )}
        </div>
  
        <div className="lg:col-span-6">
          <h2 className="text-center text-xl font-bold underline mb-4">
            {view === "list" ? "Listado de Trabajo" : "Diario de trabajo"}
          </h2>
          <div className="overflow-x-auto">
            <button className="btn btn-sm btn-ghost mb-4" onClick={() => setView("list")}>
              ← Volver
            </button>
            {(() => {
              switch (view) {
                case "list":
                  return (
                    <PlanningList
                      plannings={plannings}
                      showLink={true}
                      showState={true}
                      refreshPlanningList={listPlanning}
                      onShowDetails={showPlanningDetails}
                    />
                  ); 
                case "diary":     
                  return (
                    <PlanningRegisteredView 
                      showLink={false}
                      showState={true}
                      showDelete={false}
                    />
                  );
                case "details":
                  return (
                    <div className="w-full px-4 py-4 max-w-4xl">
                      
                      <PlanningDetailsComponent planningId={selectedPlanningId} />
                    </div>
                );
                default:  
                  return <p>Cargando vista...</p>
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningView;