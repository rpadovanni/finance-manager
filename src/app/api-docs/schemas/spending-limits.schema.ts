export const spendingLimitsSchema = {
  type: 'object',
  required: [
    'id',
    'name',
    'limit_value',
    'created_at',
    'updated_at',
    'user_id',
  ],
  properties: {
    id: {
      type: 'integer',
    },
    name: {
      type: 'string',
    },
    icon: {
      type: 'string',
    },
    current_value: {
      type: 'number',
    },
    limit_value: {
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

export const spendingLimitsPostSchema = {
  type: 'object',
  required: ['name', 'limit_value', 'user_id'],
  properties: {
    name: {
      type: 'string',
    },
    icon: {
      type: 'string',
    },
    current_value: {
      type: 'number',
    },
    limit_value: {
      type: 'number',
    },
    user_id: {
      type: 'string',
      format: 'uuid',
    },
  },
};

export const spendingLimitsPatchSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    icon: {
      type: 'string',
    },
    current_value: {
      type: 'number',
    },
    limit_value: {
      type: 'number',
    },
  },
};
