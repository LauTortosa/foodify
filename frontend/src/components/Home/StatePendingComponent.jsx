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
    <li className="mb-8 text-2xl">
      Por preparar <span className="text-4xl ml-16">{statePending}</span>
    </li>
  );
};

export default StatePendingComponent;