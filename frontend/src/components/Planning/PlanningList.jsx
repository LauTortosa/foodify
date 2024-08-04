import PlanningTableComponent from './PlanningTableComponent';

const PlanningList = ({ plannings, showLink = true, showState = true, refreshPlanningList }) => {
    return (
        <PlanningTableComponent plannings={plannings} showLink={showLink} showState={showState} refreshPlanningList={refreshPlanningList} />
    );
};

export default PlanningList;