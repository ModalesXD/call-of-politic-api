import { ResourceType } from '@prisma/client';

export interface IResource {
  id: string;
  name: string;
  type: ResourceType;
  description?: string;
  basePrice: number;
  volatility: number;
  maxPrice: number;
  minPrice: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICountryResource {
  id: string;
  countryId: string;
  resourceId: string;
  amount: number;
  production: number;
  consumption: number;
  capacity: number;
  efficiency: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IResourceResponse extends IResource {
  countryResources: Array<ICountryResource & {
    country: {
      name: string;
      code: string;
    };
  }>;
}
