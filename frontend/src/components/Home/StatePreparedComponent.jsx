import axios from "axios";
import { useEffect, useState } from "react";


const StatePreparedComponent = () => {
    const [statePrepared, setStatePrepared] = useState(0);

    useEffect(() => {
        getStatePrepared();
    });

    const getStatePrepared = async () => {
        const response = await axios.get('http://localhost:8000/planning/api/state/prepared');
        setStatePrepared(response.data["planning prepared"]);
    };

    return(
        <li className="text-2xl">
            Por registrar <span className="text-4xl ml-16">{statePrepared}</span>
        </li>
    );
};

export default StatePreparedComponent;