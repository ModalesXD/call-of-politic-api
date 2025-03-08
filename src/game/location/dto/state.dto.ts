import { IsString, IsNumber, Min, Max } from "class-validator";

export class CreateStateDto {

  @IsString()
  name: string;

  @IsString()
  countryId: string;

  @IsNumber()
  @Min(0)
  @Max(1000000000)
  population: number;

}

export class UpdateStateDto {
  @IsString()
  name?: string;

  @IsString()
  countryId?: string;

  @IsNumber()
  @Min(0)
  @Max(1000000000)
  population?: number;
}
