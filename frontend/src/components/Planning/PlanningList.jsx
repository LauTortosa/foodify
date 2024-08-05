import PlanningTableComponent from './PlanningTableComponent';

const PlanningList = ({ plannings, showLink = true, showState = true, showDelete = true, refreshPlanningList }) => {
    return (
        <PlanningTableComponent 
            plannings={plannings} 
            showLink={showLink} 
            showState={showState} 
            showDelete={showDelete} 
            refreshPlanningList={refreshPlanningList} 
        />
    );
};

export default PlanningList;