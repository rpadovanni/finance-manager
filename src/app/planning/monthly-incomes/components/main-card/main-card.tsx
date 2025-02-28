import { DollarSignIcon } from 'lucide-react';
import { memo } from 'react';
import dynamic from 'next/dynamic';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PreviousIncomes = memo(dynamic(() => import('../previous/previous')));
const IncomeMainContent = memo(
  dynamic(() => import('../main-content/main-content')),
);
const IncomesChart = memo(dynamic(() => import('../chart/chart')));

const IncomesCard = () => {
  return (
    <Card className="flex flex-1 flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Estimated income for this month
        </CardTitle>
        <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="py-0">
        <IncomeMainContent />
      </CardContent>
      <CardContent className="py-0">
        <IncomesChart />
      </CardContent>

      <CardContent className="py-0">
        <PreviousIncomes />
      </CardContent>
    </Card>
  );
};

export default IncomesCard;
