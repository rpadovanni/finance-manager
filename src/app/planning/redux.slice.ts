import { combineReducers } from '@reduxjs/toolkit';

import { goalsReducer } from './goals/redux/goals.slice';
import { monthlyIncomesReducer } from './monthly-incomes/redux/monthly-incomes.slice';
import { spendingLimitsReducer } from './spending-limits/redux/spending-limits.slice';

const planningReducer = combineReducers({
  goals: goalsReducer,
  spendingLimits: spendingLimitsReducer,
  monthlyIncomes: monthlyIncomesReducer,
});

export default planningReducer;
