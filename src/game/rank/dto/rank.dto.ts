import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class RankDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    image: string

    @IsString()
    @IsNotEmpty()
    permission: string
}