import { IsString, IsNumber, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { ResourceType } from '@prisma/client';

export class CreateResourceDto {
  @IsString()
  name: string;

  @IsEnum(ResourceType)
  type: ResourceType;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  basePrice?: number;

  @IsNumber()
  @IsOptional()
  volatility?: number;

  @IsNumber()
  @IsOptional()
  maxPrice?: number;

  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateResourceDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(ResourceType)
  @IsOptional()
  type?: ResourceType;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  basePrice?: number;

  @IsNumber()
  @IsOptional()
  volatility?: number;

  @IsNumber()
  @IsOptional()
  maxPrice?: number;

  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class CreateCountryResourceDto {
  @IsString()
  resourceId: string;

  @IsString()
  countryId: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsNumber()
  @IsOptional()
  production?: number;

  @IsNumber()
  @IsOptional()
  consumption?: number;

  @IsNumber()
  @IsOptional()
  capacity?: number;

  @IsNumber()
  @IsOptional()
  efficiency?: number;
}

export class UpdateCountryResourceDto {
  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsNumber()
  @IsOptional()
  production?: number;

  @IsNumber()
  @IsOptional()
  consumption?: number;

  @IsNumber()
  @IsOptional()
  capacity?: number;

  @IsNumber()
  @IsOptional()
  efficiency?: number;
}
