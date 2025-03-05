import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  IsDate,
} from 'class-validator';

export class PlayerDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  countryId: string;

  @IsNumber()
  ideologyId: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  image: string;

  @IsNumber()
  rankId: string;

  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
}

export class GetPlayerDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsOptional()
  countryId: string;
  @IsOptional()
  @IsNumber()
  ideologyId: string;
  @IsOptional()
  @IsNumber()
  rankId: string;

  @IsNumber()
  count: number
}
