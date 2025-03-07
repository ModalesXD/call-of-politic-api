import { IsString, IsNotEmpty, IsOptional, IsEnum, IsBoolean, IsNumber } from 'class-validator';
import { UserType } from '@prisma/client';

export class CreateBaseUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsNotEmpty()
  countryId: string;

  @IsString()
  @IsNotEmpty()
  ideologyId: string;

  @IsString()
  @IsNotEmpty()
  rankId: string;

  @IsEnum(UserType)
  type: UserType;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateBaseUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  countryId?: string;

  @IsString()
  @IsOptional()
  ideologyId?: string;

  @IsString()
  @IsOptional()
  rankId?: string;

  @IsEnum(UserType)
  @IsOptional()
  type?: UserType;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class GetBaseUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsOptional()
  count?: number;
}
