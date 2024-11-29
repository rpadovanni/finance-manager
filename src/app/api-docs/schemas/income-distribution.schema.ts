export const incomeDistributionSchema = {
  type: 'object',
  required: [
    'id',
    'category',
    'percentage',
    'amount',
    'created_at',
    'updated_at',
    'monthly_income_id',
  ],
  properties: {
    id: {
      type: 'integer',
    },
    category: {
      type: 'string',
    },
    percentage: {
      type: 'number',
    },
    amount: {
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
    monthly_income_id: {
      type: 'number',
    },
  },
};

export const incomeDistributionPostSchema = {
  type: 'object',
  required: ['category', 'percentage', 'amount', 'monthly_income_id'],
  properties: {
    category: {
      type: 'string',
    },
    percentage: {
      type: 'number',
    },
    amount: {
      type: 'number',
    },
    monthly_income_id: {
      type: 'number',
    },
  },
};

export const incomeDistributionPatchSchema = {
  type: 'object',
  properties: {
    category: {
      type: 'string',
    },
    percentage: {
      type: 'number',
    },
    amount: {
      type: 'number',
    },
  },
};
