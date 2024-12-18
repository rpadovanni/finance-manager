'use client';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { getParsedMonthAndYearDate } from '@/utils/date';
import { selectMonthlyIncomes } from '../redux/monthly-incomes.selector';

const chartConfig: ChartConfig = {
  income: {
    label: 'Income',
    color: 'hsl(var(--primary))',
  },
};

const IncomesChart = () => {
  // States
  const incomes = useSelector(selectMonthlyIncomes);

  // Vars
  const chartData = useMemo(
    () =>
      incomes.map(({ created_at, income }) => ({
        monthAndYear: getParsedMonthAndYearDate({ date: created_at }),
        income,
      })),
    [incomes],
  );

  // Render
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 0,
          right: 0,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3" />
        <XAxis className="hidden" dataKey="monthAndYear" />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Line
          dataKey="income"
          type="bump"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default IncomesChart;
