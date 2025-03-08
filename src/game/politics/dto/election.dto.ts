import { IsString, IsNumber, IsNotEmpty, IsOptional, IsArray, IsBoolean, IsDate } from "class-validator";

export class CreateElectionsDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  countryId: string;
  @IsDate()
  @IsNotEmpty()
  startDate: Date;
  @IsDate()
  @IsNotEmpty()
  endDate: Date;
  @IsString()
  @IsNotEmpty()
  status: string;
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}

export class UpdateElectionsDto extends CreateElectionsDto {

}