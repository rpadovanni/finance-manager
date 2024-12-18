import { RootState } from '@/store/store';

const getMonthAndYearFromDate = (date: Date) => ({
  month: date.getMonth() + 1,
  year: date.getFullYear(),
});

export const selectMonthlyIncomes = (state: RootState) =>
  state.planning.monthlyIncomes;

export const selectMonthlyIncomeById = (id: number) => (state: RootState) =>
  state.planning.monthlyIncomes.find(
    (monthlyIncome) => monthlyIncome.id === id,
  );

export const selectMonthlyIncomeOfTheMonth = (state: RootState) => {
  const currentDate = getMonthAndYearFromDate(new Date('2021-01-01'));

  return state.planning.monthlyIncomes.find((monthlyIncome) => {
    const filteredDate = getMonthAndYearFromDate(
      new Date(monthlyIncome.created_at),
    );

    return (
      filteredDate.month === currentDate.month &&
      filteredDate.year === currentDate.year
    );
  });
};
