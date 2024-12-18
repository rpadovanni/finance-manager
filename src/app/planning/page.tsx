import { Metadata } from 'next';
import IncomesCard from './monthly-incomes/components/main-card';

export const metadata: Metadata = {
  title: 'Financial Planning',
  description:
    'A page to manage your financial planning with income distribution, limits and goals.',
};

const PlanningPage = () => {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Financial Planning</h2>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <IncomesCard />

        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
    </div>
  );
};

export default PlanningPage;
