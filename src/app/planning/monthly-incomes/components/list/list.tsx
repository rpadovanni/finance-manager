'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import IncomeListItem from './list-item';

import { selectMonthlyIncomes } from '../../redux/monthly-incomes.selector';

const IncomeList = () => {
  // Hooks
  const incomes = useSelector(selectMonthlyIncomes);

  // Render
  const renderIncomeList = useMemo(() => {
    if (!incomes) {
      return null;
    }

    return (
      <ul>
        {incomes.map((income, index) => (
          <IncomeListItem
            key={income.id}
            index={index}
            item={income}
            withSeparator={index !== incomes.length - 1}
          />
        ))}
      </ul>
    );
  }, [incomes]);

  return renderIncomeList;
};

export default IncomeList;
