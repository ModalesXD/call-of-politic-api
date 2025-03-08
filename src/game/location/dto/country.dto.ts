
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsPostalCode, IsString, IsUrl } from 'class-validator';

export class CreateCountryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsPostalCode()
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsUrl()
  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  population: number;

  @IsNotEmpty()
  @IsNumber()
  gdp: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}

export class UpdateCountryDto extends CreateCountryDto {}
