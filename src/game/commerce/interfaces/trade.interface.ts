export interface ITrade {
  id: string;
  fromCountryId: string;
  toCountryId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';
  createdAt: Date;
  updatedAt: Date;
}

export interface ITradeItem {
  id: string;
  tradeId: string;
  resourceId: string;
  amount: number;
  price: number;
  type: 'OFFER' | 'REQUEST';
}

export interface ICountryResource {
  id: string;
  countryId: string;
  resourceId: string;
  amount: number;
  productionRate: number;
  consumptionRate: number;
  lastUpdate: Date;
}
