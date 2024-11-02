import { useEffect, useState } from "react";

import apiClient from "../apiClient";

const StatePreparedComponent = () => {
    const [statePrepared, setStatePrepared] = useState(0);

    useEffect(() => {
        getStatePrepared();
    });

    const getStatePrepared = async () => {
        const response = await apiClient.get('/planning/api/state/prepared');
        setStatePrepared(response.data["planning prepared"]);
    };

    return(
        <div className="text-lg">
            Por registrar <span className="text-2xl ml-20">{statePrepared}</span>
        </div>
    );
};

export default StatePreparedComponent;