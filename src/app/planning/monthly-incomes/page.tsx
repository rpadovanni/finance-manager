'use client';

import { useSelector } from 'react-redux';
import {
  selectMonthlyIncomeById,
  selectMonthlyIncomes,
} from './redux/monthly-incomes.selector';
import { TMonthlyIncomeWithDistributions } from './utils/types';

const MonthlyIncomesPage = () => {
  const incomes = useSelector(selectMonthlyIncomes);
  const incomeById = useSelector(selectMonthlyIncomeById(1));

  return (
    <div>
      <h1>Monthly Incomes Page</h1>

      <ul>
        <li>
          <b>Goals Map</b>
        </li>
        {incomes.map((income: TMonthlyIncomeWithDistributions) => (
          <ul key={income.id}>
            <li>{income.income}</li>
            <li>{income.user_id}</li>
            <li>
              {income.distributions.map((distribution) => (
                <ul key={distribution.id}>
                  <li>{distribution.id}</li>
                  <li>{distribution.amount}</li>
                </ul>
              ))}
            </li>
          </ul>
        ))}
        <li>
          <b>Goal by ID</b>
        </li>
        <li>{incomeById?.income}</li>
      </ul>
    </div>
  );
};

export default MonthlyIncomesPage;
