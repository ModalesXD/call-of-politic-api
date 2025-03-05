import { IsString, IsNumber, IsUrl, IsNotEmpty, IsOptional } from "class-validator";

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

export class CreateAnunceDto  {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
    @IsString()  
    countryId: string;
    @IsString()
    categoryId: string;
    
    @IsString()
    @IsNotEmpty()
    content: string;
  
    @IsString()
    @IsUrl()
    @IsNotEmpty()
    image: string;
}