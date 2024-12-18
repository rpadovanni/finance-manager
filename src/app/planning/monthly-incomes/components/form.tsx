'use client';

import { CheckIcon, PlusIcon, X } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import CurrencyInput from './currency-input';
import { Button } from '@/components/ui/button';

import { currencyFormatter } from '@/utils/currency';

const formSchema = z.object({
  currency: z.string().transform((val) => Number(val.replace(/[^\d.-]/g, ''))),
});

type FormInputData = z.input<typeof formSchema>;
type FormOutputData = z.output<typeof formSchema>;

type IncomeFormProps = {
  closeButtonHandler: () => void;
  mode: 'add' | 'edit';
};

const IncomeForm = ({ closeButtonHandler, mode }: IncomeFormProps) => {
  // Vars
  const isAddMode = mode === 'add';
  const defaultValues = useMemo(
    () => ({ currency: currencyFormatter({ value: 0 }) }),
    [],
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputData, any, FormOutputData>({
    resolver: zodResolver(formSchema),
    ...defaultValues,
  });

  // Handlers
  const onSubmit: SubmitHandler<FormOutputData> = (data) => {
    console.log(data);
  };

  // Utils
  const renderFormButtons = useMemo(
    () =>
      isAddMode ? (
        <Button size="icon" type="submit">
          <PlusIcon />
        </Button>
      ) : (
        <div>
          <Button size="icon" type="submit" className="mr-2">
            <CheckIcon />
          </Button>
          <Button size="icon" variant="outline" onClick={closeButtonHandler}>
            <X />
          </Button>
        </div>
      ),
    [isAddMode, closeButtonHandler],
  );

  // Render
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-2">
        <CurrencyInput
          control={control}
          name="currency"
          error={errors.currency}
        />
        {renderFormButtons}
      </div>

      {isAddMode && (
        <p className="pt-4 text-xs text-muted-foreground md:w-3/4">
          It seems that you don't have any income yet. Add your first income to
          start planning your month.
        </p>
      )}
    </form>
  );
};

export default IncomeForm;
