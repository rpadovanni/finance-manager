'use client';

import { Control, Controller, FieldError } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { currencyFormatter } from '@/utils/currency';

type CurrencyInputProps = {
  name: string;
  error?: FieldError | null;
  control: Control<any>;
};

const CurrencyInput = ({ name, error = null, control }: CurrencyInputProps) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, value, onChange, ...fieldProps } }) => (
          <NumericFormat
            className="border-b-2 border-solid focus:border-primary focus:outline-none"
            decimalScale={2}
            decimalSeparator="."
            getInputRef={ref}
            placeholder={currencyFormatter({ value: 0 })}
            prefix="$"
            thousandSeparator=","
            fixedDecimalScale
            {...fieldProps}
          />
        )}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </>
  );
};

export default CurrencyInput;
