import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomeView from '../views/HomeView';
import PlanningView from '../views/PlanningView';
import PlanningRegisteredView from '../views/PlanningRegisteredView';
import PlanningDetailsView from '../views/PlanningDetailsView';
import RecipeView from '../views/RecipeView';
import CalculateView from '../views/CalculateView';

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/planning" element={<PlanningView />} />
      <Route path="/planning/:id" element={<PlanningDetailsView />} />
      <Route path="/planning-registered" element={<PlanningRegisteredView />} />
      <Route path="/recipes" element={<RecipeView />} />
      <Route path="/calculate-kilograms" element={<CalculateView />} />
    </Routes>
  );
};

export default MyRoutes;
