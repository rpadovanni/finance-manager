'use client';

import { useSelector } from 'react-redux';
import { selectGoalById, selectGoals } from './redux/goals.selector';
import { TGoal } from './utils/types';

const GoalsPage = () => {
  const goals = useSelector(selectGoals);
  const goalById = useSelector(selectGoalById(1));

  return (
    <div>
      <h1>Goals</h1>
      ---
      <ul>
        <li>
          <b>Goals Map</b>
        </li>
        {goals.map((goal: TGoal) => (
          <ul key={goal.id}>
            <li>{goal.icon}</li>
            <li>{goal.name}</li>
            <li>
              {goal.current_value} - {goal.target_value}
            </li>
          </ul>
        ))}
        <li>
          <b>Goal by ID</b>
        </li>
        <li>{goalById?.name}</li>
      </ul>
    </div>
  );
};

export default GoalsPage;
