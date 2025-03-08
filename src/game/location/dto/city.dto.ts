import { IsNumber, IsString, Min, Max } from "class-validator";

export class CreateCityDto {

  @IsString()
  name: string;

  @IsString()
  stateId: string;

  @IsString()
  countryId: string;

  coordinates: coordinates;
}

export class UpdateCityDto {
  @IsString()
  name?: string;

  @IsString()
  stateId?: string;

  @IsString()
  countryId?: string;

  coordinates: coordinates;
}

class coordinates {
    @IsNumber()
    @Min(-90)
    @Max(90)
    latitude: number;
  
    @IsNumber()
    @Min(-180)
    @Max(180)
    longitude: number

}