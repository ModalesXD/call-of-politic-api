export interface IEvent {
  id: string;
  title: string;
  content: string;
  countryId: string;
  categoryId: string;
  description?: string;
  imageUrl?: string;
  startDate?: Date;
  endDate?: Date;
  impact: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEventResponse extends IEvent {
  country: {
    name: string;
    code: string;
  };
  category: {
    name: string;
  };
}
