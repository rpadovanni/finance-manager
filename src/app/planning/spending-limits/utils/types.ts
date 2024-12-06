export type TSpendingLimitPostPayload = {
  name: string;
  icon: string;
  current_value: number;
  limit_value: number;
  user_id: string;
};

export type TSpendingLimit = TSpendingLimitPostPayload & {
  id: number;

  created_at: string;
  updated_at: string;
};

export type TSpendingLimitPatchPayload = {
  name?: string;
  icon?: string;
  current_value?: number;
  limit_value?: number;
};
