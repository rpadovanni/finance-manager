type CurrencyFormatterProps = {
  value: number;
  locale?: 'pt-BR' | 'en-US';
};

export const currencyFormatter = ({
  locale = 'en-US',
  value,
}: CurrencyFormatterProps) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};
