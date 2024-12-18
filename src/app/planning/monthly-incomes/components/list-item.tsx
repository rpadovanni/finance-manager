import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/utils/styles';
import { currencyFormatter } from '@/utils/currency';
import { getParsedMonthAndYearDate } from '@/utils/date';
import { TMonthlyIncomeWithDistributions } from '../utils/types';

interface Props {
  index: number;
  item: TMonthlyIncomeWithDistributions;
  withSeparator?: boolean;
}

const IncomeListItem = ({
  index,
  item: { created_at, income },
  withSeparator,
}: Props) => {
  return (
    <li className={cn('flex flex-col', { 'bg-zinc-50': index % 2 === 0 })}>
      <div className="flex items-center justify-center gap-4 py-2">
        <Badge>{getParsedMonthAndYearDate({ date: created_at })}</Badge>
        <p className="text-sm font-medium">
          {currencyFormatter({ value: income })}
        </p>
      </div>
      {withSeparator && <Separator />}
    </li>
  );
};

export default IncomeListItem;
