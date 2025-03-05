import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';


export class GetAnunceDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
  
    @IsNumber()
    @IsNotEmpty()
    countryId?: number;
  }
  
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
    countryId: number;
  
    @IsString()
    @IsNotEmpty()
    categoryId: number;
  
    @IsString()
    @IsOptional()
    @IsUrl()
    image: string;
  }