import { IsString, IsNotEmpty, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateTaxDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  rate: number;

  @IsString()
  @IsNotEmpty()
  countryId: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateTaxDto {
  @IsString()
  @IsOptional()
  type?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  rate?: number;

  @IsString()
  @IsOptional()
  description?: string;
}

export class GetTaxDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  countryId?: string;

  @IsNumber()
  @IsOptional()
  count?: number;
}
