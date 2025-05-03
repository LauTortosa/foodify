import { useStatePlanning } from "../../hooks/useStatePlanning";

const StatePreparedComponent = () => {
    const { statePrepared } = useStatePlanning(0);

    return(
        <div className="text-lg">
            Por registrar <span className="text-2xl ml-20">{statePrepared}</span>
        </div>
    );
};

export default StatePreparedComponent;