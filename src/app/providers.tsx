import { ReactNode } from 'react';

export const withProviders = (
  ...providers: React.ComponentType<{ children: ReactNode }>[]
) => {
  return ({ children }: { children: ReactNode }) =>
    providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children,
    );
};
