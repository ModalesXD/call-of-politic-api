import { IsString, IsNumber, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { TaxType } from '@prisma/client';

export class CreateEconomyDto {
  @IsString()
  countryId: string;

  @IsNumber()
  @IsOptional()
  treasury?: number;

  @IsNumber()
  @IsOptional()
  gdpGrowth?: number;

  @IsNumber()
  @IsOptional()
  inflation?: number;

  @IsNumber()
  @IsOptional()
  unemployment?: number;

  @IsNumber()
  @IsOptional()
  debt?: number;

  @IsString()
  @IsOptional()
  creditRating?: string;

  @IsNumber()
  @IsOptional()
  marketStability?: number;

  @IsNumber()
  @IsOptional()
  tradeBalance?: number;
}

export class UpdateEconomyDto {
  @IsNumber()
  @IsOptional()
  treasury?: number;

  @IsNumber()
  @IsOptional()
  gdpGrowth?: number;

  @IsNumber()
  @IsOptional()
  inflation?: number;

  @IsNumber()
  @IsOptional()
  unemployment?: number;

  @IsNumber()
  @IsOptional()
  debt?: number;

  @IsString()
  @IsOptional()
  creditRating?: string;

  @IsNumber()
  @IsOptional()
  marketStability?: number;

  @IsNumber()
  @IsOptional()
  tradeBalance?: number;
}

export class CreateTaxDto {
  @IsEnum(TaxType)
  type: TaxType;

  @IsNumber()
  rate: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  countryId: string;
}

export class UpdateTaxDto {
  @IsNumber()
  @IsOptional()
  rate?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
