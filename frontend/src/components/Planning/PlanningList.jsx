import PlanningTableComponent from './PlanningTableComponent';

const PlanningList = ({ plannings, showLink = true, showState = true }) => {
    return (
        <PlanningTableComponent plannings={plannings} showLink={showLink} showState={showState} />
    );
};

export default PlanningList;