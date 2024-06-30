import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeView from '../views/HomeView';
import PlanningView from '../views/PlanningView';

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/planning" element={<PlanningView />} />
    </Routes>
  );
};

export default MyRoutes;
