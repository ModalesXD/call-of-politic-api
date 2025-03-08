import { IsString, IsNumber, IsNotEmpty, IsOptional, IsArray, IsBoolean, IsDate, isString } from "class-validator";

export class PlayerElectionsDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  electionId: string;
  @IsString()
  @IsNotEmpty()
  playerId?: string | null;
  @IsString()
  @IsNotEmpty()
  npcId?: string | null;
  @IsNumber()
  @IsNotEmpty()
  votes: number;
  @IsString()
  @IsNotEmpty()
  position?: string | null;
  @IsString()
  @IsNotEmpty()
  manifesto?: string | null;
  @IsString()
  @IsNotEmpty()
  status: string;
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}

export class CreatePlayerElectionsDTO {
  @IsString()
  @IsNotEmpty()
  electionId: string;
  @IsString()
  @IsNotEmpty()
  playerId?: string | null;
  @IsString()
  @IsNotEmpty()
  npcId?: string | null;
  @IsString()
  @IsNotEmpty()
  position?: string | null;
  @IsString()
  @IsNotEmpty()
  manifesto?: string | null;
}

export class UpdatePlayerElectionsDTO {
  @IsNumber()
  @IsOptional()
  votes?: number;
  @IsString()
  @IsOptional()
  position?: string | null;
  @IsString()
  @IsOptional()
  manifesto?: string | null;
}
    
export class CreatePlayerElectionDto {
  @IsString()
  @IsNotEmpty() 
  electionId: string;
  @IsString()
  @IsNotEmpty()
  playerId?: string | null;
  @IsString()
  @IsNotEmpty()
  npcId?: string | null;
  @IsNumber()
  @IsNotEmpty()
  votes: number;
  @IsString()
  @IsNotEmpty()
  position?: string | null;
  @IsString()
  @IsNotEmpty()
  manifesto?: string | null;
}

export class UpdatePlayerElectionDto {
  @IsString()
  @IsOptional()
  votes?: number;
  @IsString()
  @IsOptional()
  position?: string | null;
  @IsString()
  @IsOptional()
  manifesto?: string | null;
}

