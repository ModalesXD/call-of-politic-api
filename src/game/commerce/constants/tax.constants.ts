export const TAX_CONSTANTS = {
  MIN_RATE: 0,
  MAX_RATE: 100,
  DEFAULT_RATE: 10,
  TAX_TYPES: [
    'INCOME',
    'CORPORATE',
    'SALES',
    'PROPERTY',
    'IMPORT',
    'EXPORT',
    'LUXURY',
    'CARBON',
  ] as const,
} as const;
