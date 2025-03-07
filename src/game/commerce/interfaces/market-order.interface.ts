export interface IMarketOrder {
  id: string;
  resourceId: string;
  countryId: string;
  type: 'BUY' | 'SELL';
  amount: number;
  price: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
}
