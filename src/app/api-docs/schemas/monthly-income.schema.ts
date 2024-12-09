export const monthlyIncomeSchema = {
  type: 'object',
  required: ['id', 'income', 'created_at', 'updated_at', 'user_id'],
  properties: {
    id: {
      type: 'number',
    },
    income: {
      type: 'number',
    },
    created_at: {
      type: 'string',
      format: 'date-time',
    },
    updated_at: {
      type: 'string',
      format: 'date-time',
    },
    user_id: {
      type: 'string',
      format: 'uuid',
    },
  },
};

export const monthlyIncomePostAndPatchSchema = {
  type: 'object',
  required: ['income'],
  properties: {
    income: {
      type: 'number',
    },
  },
};
