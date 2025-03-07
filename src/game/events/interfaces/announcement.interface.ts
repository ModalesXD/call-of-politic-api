export interface IAnnouncement {
  id: string;
  title: string;
  content: string;
  countryId: string;
  categoryId: string;
  imageUrl?: string;
  isActive: boolean;
  priority: number;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAnnouncementResponse extends IAnnouncement {
  country: {
    name: string;
    code: string;
  };
  category: {
    name: string;
  };
}
