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
    <li>
      Por preparar {statePending}
    </li>
  );
};

export default StatePendingComponent;