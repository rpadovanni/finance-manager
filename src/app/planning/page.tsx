'use client';

import GoalsPage from './goals/page';
import MonthlyIncomesPage from './monthly-incomes/page';
import SpendingLimitPage from './spending-limits/page';

const PlanningPage = () => {
  return (
    <div>
      <h1>PlanningPage</h1>

      <GoalsPage />
      <SpendingLimitPage />
      <MonthlyIncomesPage />
    </div>
  );
};

export default PlanningPage;
