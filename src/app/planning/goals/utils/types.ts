export type TGoalPostPayload = {
  current_value: number | null;
  deadline: string | null;
  icon: string | null;
  name: string;
  target_value: number;
  user_id: string;
};

export type TGoal = TGoalPostPayload & {
  id: number;
  user_id: string;

  created_at: string;
  updated_at: string;
};

export type TGoalPatchPayload = {
  current_value?: number;
  deadline?: string;
  icon?: string;
  name?: string;
  target_value?: number;
};
