import { IsString, IsNumber, IsUrl, IsNotEmpty, IsOptional, IsDate, IsBoolean } from "class-validator";

export class AnunceDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  countryId: string;
  categoryId: string;
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  image: string;
}

export class GetAnunceDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class CreateAnunceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  countryId?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  priority?: number;
}

export class UpdateAnunceDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  countryId?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  priority?: number;
}