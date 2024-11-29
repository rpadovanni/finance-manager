export const goalSchema = {
  type: 'object',
  required: [
    'id',
    'name',
    'target_value',
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
    target_value: {
      type: 'number',
    },
    current_value: {
      type: 'number',
    },
    deadline: {
      type: 'string',
      format: 'date',
    },
    icon: {
      type: 'string',
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

export const goalPostSchema = {
  type: 'object',
  required: ['name', 'target_value'],
  properties: {
    name: {
      type: 'string',
    },
    target_value: {
      type: 'number',
    },
    deadline: {
      type: 'string',
      format: 'date',
    },
    icon: {
      type: 'string',
    },
  },
};

export const goalPatchSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    target_value: {
      type: 'number',
    },
    deadline: {
      type: 'string',
      format: 'date',
    },
    icon: {
      type: 'string',
    },
  },
};
