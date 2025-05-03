import { useStatePlanning } from "../../hooks/useStatePlanning";

const StatePendingComponent = () => {
  const { statePending } = useStatePlanning(0);

  return(
    <div className="mb-8 text-lg">
      Por preparar <span className="text-2xl ml-20">{statePending}</span>
    </div>
  );
};

export default StatePendingComponent;