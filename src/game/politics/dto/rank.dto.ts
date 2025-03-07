import { IsString, IsNumber, IsNotEmpty, IsOptional, IsArray, IsBoolean } from "class-validator";

export class CreateRankDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsString({ each: true })
    permission: string[];

    @IsNumber()
    @IsOptional()
    level?: number;
}

export class UpdateRankDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    permission?: string[];

    @IsNumber()
    @IsOptional()
    level?: number;
}