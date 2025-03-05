import { IsString, IsNumber, IsUrl, IsArray } from "class-validator";


export class CreateEventDto {
    
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    content: string;

    @IsNumber()
    countryId: number;

    @IsNumber()
    categoryId: number;

    @IsString()
    @IsUrl()
    image: string;
}

export class GetEventDto {
    @IsNumber()
    id: number;
}

export class UpdateEventDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    content: string;

    @IsNumber()
    countryId: number;

    @IsNumber()
    categoryId: number;

    @IsString()
    @IsUrl()
    image: string;
}

export class DeleteEventDto {
    @IsNumber()
    id: number;
}

