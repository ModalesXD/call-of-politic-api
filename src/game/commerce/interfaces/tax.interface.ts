export interface ITax {
  id: string;
  type: string;
  rate: number;
  countryId: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaxResponse extends ITax {
  country: {
    name: string;
    code: string;
    economy: {
      treasury: number;
      gdpGrowth: number;
    };
  };
}
