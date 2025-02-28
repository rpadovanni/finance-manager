import { cleanup, render, screen } from '@testing-library/react';
import IncomesCard from './main-card';
import ReduxProvider from '@/store/redux-provider';
import PreviousIncomes from '../previous/previous';
import IncomeMainContent from '../main-content/main-content';
import IncomesChart from '../chart/chart';

jest.mock('../previous/previous', () => jest.fn(() => null));
jest.mock('../main-content', () => jest.fn(() => null));
jest.mock('../chart/chart', () => jest.fn(() => null));

const Component = () => (
  <ReduxProvider>
    <IncomesCard />
  </ReduxProvider>
);

describe('IncomesCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render', () => {
    render(<Component />);
    expect(
      screen.getByText('Estimated income for this month'),
    ).toBeInTheDocument();
  });

  it('should render the icon correctly', () => {
    const { container } = render(<Component />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('should render the main income content', () => {
    render(<Component />);
    expect(IncomeMainContent).toHaveBeenCalled();
  });

  it('should render the income chart', () => {
    render(<Component />);
    expect(IncomesChart).toHaveBeenCalled();
  });

  it('should render the previous incomes', () => {
    render(<Component />);
    expect(PreviousIncomes).toHaveBeenCalled();
  });
});
