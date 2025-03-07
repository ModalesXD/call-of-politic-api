import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  IsDate,
  IsEmail,
} from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  discordId?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  experience?: number;

  @IsNumber()
  @IsOptional()
  level?: number;

  @IsNumber()
  @IsOptional()
  balance?: number;

  @IsDate()
  @IsOptional()
  lastLoginAt?: Date;
}

export class UpdatePlayerDto {
  @IsString()
  @IsOptional()
  discordId?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  experience?: number;

  @IsNumber()
  @IsOptional()
  level?: number;

  @IsNumber()
  @IsOptional()
  balance?: number;

  @IsDate()
  @IsOptional()
  lastLoginAt?: Date;
}

export class GetPlayerDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsOptional()
  count?: number;
}
