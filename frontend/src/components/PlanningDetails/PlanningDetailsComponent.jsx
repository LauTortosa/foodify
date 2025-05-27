import api from "../../api/api.jsx";
import { useEffect, useState } from "react";

import CheckboxLoads from "./CheckboxLoads";

const PlanningDetailsComponent = ({ planningId, onEditClick }) => {
  const [planning, setPlanning] = useState({ 
    component_value: [], 
    state_value: "",
    load: 0,
    date_value: "",
    tracebility: 0,
    product_value: ""
  });

  useEffect(() => {
    getPlanning();
  }, [planningId]);

  const getPlanning = async () => {
    const response = await api.get(`/planning/api/${planningId}`);
    const data = response.data;

    setPlanning({
      state_value: data.state_value,
      load: data.load,
      date_value: data.date_value,
      tracebility: data.tracebility,
      product_value: data.product_value,
      component_value: data.component_value || []
    });
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border w-full">
      <h2 className="text-2xl font-bold uppercase flex items-center gap-3 mb-4">
        {planning.product_value}
        <span className="text-xs bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-gray-700">
          {planning.state_value}
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-800 mb-6">
        <p><span className="font-medium">📅 Fecha de inicio:</span> {planning.date_value}</p>
        <p><span className="font-medium">⚖️ Cargas:</span> {planning.load}</p>
        <p><span className="font-medium">🔍 Trazabilidad:</span> {planning.tracebility}</p>
      </div>

      <CheckboxLoads
        components={planning.component_value}
        load={planning.load}
        planningId={planningId}
      />
    </div>
  );
};

export default PlanningDetailsComponent;