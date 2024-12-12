import { combineReducers } from '@reduxjs/toolkit';
import { spendingLimitsReducer } from '../spending-limits/redux/spending-limits.slice';
import { goalsReducer } from '../goals/redux/goals.slice';

const planningReducer = combineReducers({
  goals: goalsReducer,
  spendingLimits: spendingLimitsReducer,
  // monthlyIncomes: monthlyIncomesReducer
});

export default planningReducer;
