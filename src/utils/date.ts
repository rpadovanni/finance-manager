type TDateLocale = {
  date: Date | string;
  locale?: 'pt-BR' | 'en-US';
};

export const getParsedMonthAndYearDate = ({
  date,
  locale = 'en-US',
}: TDateLocale) => {
  const newDate = typeof date === 'string' ? new Date(date) : date;
  const dateString = newDate
    .toLocaleDateString(locale, {
      month: 'short',
      year: 'numeric',
    })
    .replace(/^\w/, (c) => c.toUpperCase());

  const localeFormattedDate =
    locale === 'pt-BR'
      ? dateString.replace('. de ', ', ')
      : dateString.replace(' ', ', ');

  return localeFormattedDate;
};
