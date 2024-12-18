'use client';

import { useSelector } from 'react-redux';

import IncomeList from './list';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { selectMonthlyIncomes } from '../redux/monthly-incomes.selector';

const PreviousIncomes = () => {
  // States
  const incomes = useSelector(selectMonthlyIncomes);

  // Render
  if (!incomes) {
    return null;
  }

  return (
    <Accordion type="single" className="pb-0" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Want to see previous incomes?</AccordionTrigger>

        <AccordionContent>
          <ScrollArea className="max-h-[200px] rounded-md border">
            <IncomeList />
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PreviousIncomes;
