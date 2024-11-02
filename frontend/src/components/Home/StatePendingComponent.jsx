import { useEffect, useState } from "react";

import apiClient from "../apiClient";

const StatePendingComponent = () => {
  const [statePending, setStatePending] = useState(0);

  useEffect(() => {
    getStatePending();
  }, []);

  const getStatePending = async() => {
    const response = await apiClient.get('/planning/api/state/pending');
    setStatePending(response.data["planning pending"]);
  };

  return(
    <div className="mb-8 text-lg">
      Por preparar <span className="text-2xl ml-20">{statePending}</span>
    </div>
  );
};

export default StatePendingComponent;