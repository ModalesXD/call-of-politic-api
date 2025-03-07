export interface IPlayer {
  id: string;
  discordId?: string;
  email?: string;
  experience: number;
  level: number;
  balance: number;
  lastLoginAt?: Date;
}

export interface IPlayerResponse extends IPlayer {
  baseUser: {
    name: string;
    image?: string;
    countryId: string;
    ideologyId: string;
    rankId: string;
  };
}
