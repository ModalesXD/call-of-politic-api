export interface IRank {
  id: string;
  name: string;
  image?: string;
  description?: string;
  permission: string[];
  level: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRankResponse extends IRank {
  baseUsers: Array<{
    id: string;
    name: string;
    type: string;
  }>;
}
