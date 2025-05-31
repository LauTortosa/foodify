import axios from "axios";
import { useEffect, useState } from "react";
import usePdfGenerator from "../hooks/usePdfGenerator";

import PlanningTableComponent from "../components/Planning/PlanningTableComponent";

const PlanningRegisteredView = ({showLink = false, showState = false, showDelete = false}) => {
    const [plannings, setPlannings] = useState([]);
    const { generatePdf } = usePdfGenerator();

    useEffect(() => {
        listRegistereds();
    }, []);

    const listRegistereds = async () => {
        const response = await axios.get('http://localhost:8000/planning/api/registered');
        console.log("response", response.data);

        setPlannings(response.data);
    };

    const handleClick = () => {
        const rows = plannings.map((planning, index) => ([
            index + 1,
            planning.date_value,
            planning.tracebility,
            planning.product_value,
            planning.load
        ]));

        generatePdf({
            title: "Diario de trabajos registrados",
            columns: ["#", "Fecha", "Trazabilidad", "Producto", "Cargas"],
            data: rows,
            filename: "trabajos-registrados.pdf"
        });
    };

    return (
        <div className="overflow-x-auto">
            <PlanningTableComponent 
                plannings={plannings} 
                showLink={showLink} 
                showState={showState} 
                showDelete={showDelete} 
            />
            <button className="btn btn-sm btn-ghost mt-4 mb-4" onClick={handleClick}>📄 Generar pdf</button>
        </div>
    );
};

export default PlanningRegisteredView;

