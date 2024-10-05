import axios from "axios";
import { useEffect, useState } from "react";

const StatePendingComponent = () => {
  const [statePending, setStatePending] = useState(0);

  useEffect(() => {
    getStatePending();
  }, []);

  const getStatePending = async() => {
    const response = await axios.get('http://localhost:8000/planning/api/state/pending');
    setStatePending(response.data["planning pending"]);
  };

  return(
    <div className="mb-8 text-lg">
      Por preparar <span className="text-2xl ml-20">{statePending}</span>
    </div>
  );
};

export default StatePendingComponent;