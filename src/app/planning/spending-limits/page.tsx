'use client';

import { useSelector } from 'react-redux';
import {
  selectSpendingLimitById,
  selectSpendingLimits,
} from './redux/spending-limits.selector';
import { TSpendingLimit } from './utils/types';

const SpendingLimitPage = () => {
  const limit = useSelector(selectSpendingLimits);
  const limitById = useSelector(selectSpendingLimitById(1));

  return (
    <div>
      <h1>Limits</h1>
      ---
      <ul>
        <li>
          <b>Limits Map</b>
        </li>
        {limit.map((limit: TSpendingLimit) => (
          <ul key={limit.id}>
            <li>{limit.icon}</li>
            <li>{limit.name}</li>
            <li>
              {limit.current_value} - {limit.limit_value}
            </li>
          </ul>
        ))}
        <li>
          <b>Limit by ID</b>
        </li>
        <li>{limitById?.name}</li>
      </ul>
    </div>
  );
};

export default SpendingLimitPage;
