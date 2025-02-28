'use client';

import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { SquarePenIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import IncomeForm from '../form/form';

import { currencyFormatter } from '@/utils/currency';

import {
  selectMonthlyIncomeOfTheMonth,
  selectMonthlyIncomes,
} from '../../redux/monthly-incomes.selector';

const IncomeMainContent = () => {
  // States
  const [showForm, setShowForm] = useState(false);
  const currentIncome = useSelector(selectMonthlyIncomeOfTheMonth);
  const incomes = useSelector(selectMonthlyIncomes);

  // Handlers
  const handleShowForm = useCallback(() => setShowForm(true), []);
  const handleCloseForm = useCallback(() => setShowForm(false), []);

  // Utils
  const percentageDifferenceFromLastMonth = useMemo(() => {
    if (incomes && incomes.length > 1) {
      const lastIncome = incomes[1].income;
      const percentageDifference =
        ((currentIncome?.income || 0 - lastIncome) / lastIncome) * 100;
      const sign = percentageDifference >= 0 ? '+' : '-';

      return `${sign}${Math.abs(percentageDifference)}% from last month`;
    }

    return '0% from last month';
  }, [incomes, currentIncome]);

  // Render
  return (
    <>
      {currentIncome && !showForm ? (
        <>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-bold text-primary">
              {currencyFormatter({ value: currentIncome.income })}
            </div>

            <Button variant="ghost" size="icon" onClick={handleShowForm}>
              <SquarePenIcon className="text-muted-foreground" />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            {percentageDifferenceFromLastMonth}
          </p>
        </>
      ) : (
        <IncomeForm
          mode={currentIncome ? 'edit' : 'add'}
          closeButtonHandler={handleCloseForm}
        />
      )}
    </>
  );
};

export default IncomeMainContent;
