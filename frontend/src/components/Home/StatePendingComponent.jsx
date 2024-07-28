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
    <li className="mb-8 text-xl ml-2">
      Por preparar <span className="text-3xl ml-24">{statePending}</span>
    </li>
  );
};

export default StatePendingComponent;