import { UserType } from '@prisma/client';

export interface IBaseUser {
  id: string;
  name: string;
  image?: string;
  countryId: string;
  ideologyId: string;
  rankId: string;
  type: UserType;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBaseUserResponse extends IBaseUser {
  country: {
    name: string;
    code: string;
  };
  ideology: {
    name: string;
  };
  rank: {
    name: string;
    level: number;
  };
  player?: {
    id: string;
    experience: number;
    level: number;
  };
  npc?: {
    id: string;
    behavior: string;
    difficulty: number;
  };
}
