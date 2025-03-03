import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUrl, isString } from 'class-validator';

export class CreateAnunceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  countrieId: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  image: string;
}