'use client';

import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { currencyFormatter } from '@/utils/currency';

type CurrencyInputProps<T extends FieldValues> = {
  name: Path<T>;
  error?: FieldError | null;
  control: Control<T>;
};

const CurrencyInput = <T extends FieldValues>({
  name,
  error = null,
  control,
}: CurrencyInputProps<T>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...fieldProps } }) => (
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
