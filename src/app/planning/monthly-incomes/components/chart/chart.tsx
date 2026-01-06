'use client';

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { getParsedMonthAndYearDate } from '@/utils/date';
import { selectMonthlyIncomes } from '../../redux/monthly-incomes.selector';
import { currencyFormatter } from '@/utils/currency';

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

  // Render empty state
  if (!chartData.length) {
    return <div className="p-6 text-center text-muted-foreground">No income data available</div>;
  }

  // Render
  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3" />
          <XAxis 
            dataKey="monthAndYear" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => currencyFormatter(value)}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Line
            dataKey="income"
            type="monotone"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            name="Income"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default IncomesChart;
