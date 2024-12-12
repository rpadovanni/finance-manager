'use client';

import GoalsPage from './goals/page';
import SpendingLimitPage from './spending-limits/page';

const PlanningPage = () => {
  return (
    <div>
      <h1>PlanningPage</h1>

      <GoalsPage />
      <SpendingLimitPage />
    </div>
  );
};

export default PlanningPage;
