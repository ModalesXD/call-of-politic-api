export interface IEconomy {
  id: string;
  countryId: string;
  treasury: number;
  gdpGrowth: number;
  inflation: number;
  unemployment: number;
  debt: number;
  creditRating: string;
  marketStability: number;
  tradeBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEconomyResponse extends IEconomy {
  country: {
    name: string;
    code: string;
  };
  taxes: Array<{
    type: string;
    rate: number;
    description?: string;
  }>;
}
