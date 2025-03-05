import { IsString, IsNumber, IsUrl, IsArray } from "class-validator";


export class CreateEventDto {
    
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    content: string;

    @IsNumber()
    countryId: string;

    @IsNumber()
    categoryId: string;

    @IsString()
    @IsUrl()
    image: string;
}

export class GetEventDto {
    @IsNumber()
    id: string;
}

export class UpdateEventDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    content: string;

    @IsNumber()
    countryId: string;

    @IsNumber()
    categoryId: string;

    @IsString()
    @IsUrl()
    image: string;
}

export class DeleteEventDto {
    @IsNumber()
    id: string;
}

