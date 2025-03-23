'use client';

import { CheckIcon, PlusIcon, X } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// import CurrencyInput from '../currency-input/currency-input';
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
  } = useForm<FormInputData, unknown, FormOutputData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Handlers
  const onSubmit: SubmitHandler<FormOutputData> = (data) => {
    // TODO: Handle form submission
    // eslint-disable-next-line no-console
    console.log(data);
  };

  // Utils
  const renderFormButtons = useMemo(
    () =>
      isAddMode ? (
        <button
          type="submit"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <PlusIcon />
        </button>
      ) : (
        <div>
          <button
            type="submit"
            className="mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <CheckIcon />
          </button>
          <button
            type="button"
            onClick={closeButtonHandler}
            className="border-input hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background"
          >
            <X />
          </button>
        </div>
      ),
    [isAddMode, closeButtonHandler],
  );

  // Render
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* TODO: Temporary workaround - will revisit components later */}
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <input
            className="border-input placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2"
            placeholder="0.00"
            {...control.register('currency')}
          />
          {errors.currency && (
            <span className="text-destructive text-xs">
              {errors.currency.message}
            </span>
          )}
        </div>
        {renderFormButtons}
      </div>

      {isAddMode && (
        <p className="text-muted-foreground pt-4 text-xs md:w-3/4">
          It seems that you don't have any income yet. Add your first income to
          start planning your month.
        </p>
      )}
    </form>
  );
};

export default IncomeForm;
