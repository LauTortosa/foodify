import { useStatePlanning } from "../../hooks/useStatePlanning";

const StatePendingComponent = () => {
  const { statePending } = useStatePlanning(0);

  return(
    <div className="mb-4 text-md">
      Por preparar <span className="text-xl ml-8">{statePending}</span>
    </div>
  );
};

export default StatePendingComponent;