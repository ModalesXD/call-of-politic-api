import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetAnunceDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  countrieId?: number;
}
