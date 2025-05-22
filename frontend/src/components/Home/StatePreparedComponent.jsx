import { useStatePlanning } from "../../hooks/useStatePlanning";

const StatePreparedComponent = () => {
    const { statePrepared } = useStatePlanning(0);

    return(
        <div className="text-md">
            Por registrar <span className="text-xl ml-8">{statePrepared}</span>
        </div>
    );
};

export default StatePreparedComponent;