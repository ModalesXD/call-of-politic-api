import { IsString, IsNumber, IsUrl, IsOptional, IsDate, IsBoolean, IsArray } from "class-validator";


export class CreateEventDto {
    
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    countryId: string;

    @IsString()
    categoryId: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsUrl()
    @IsOptional()
    imageUrl?: string;

    @IsDate()
    @IsOptional()
    startDate?: Date;

    @IsDate()
    @IsOptional()
    endDate?: Date;

    @IsNumber()
    @IsOptional()
    impact?: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

export class GetEventDto {
    @IsNumber()
    id: string;
}

export class UpdateEventDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsString()
    @IsOptional()
    countryId?: string;

    @IsString()
    @IsOptional()
    categoryId?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsUrl()
    @IsOptional()
    imageUrl?: string;

    @IsDate()
    @IsOptional()
    startDate?: Date;

    @IsDate()
    @IsOptional()
    endDate?: Date;

    @IsNumber()
    @IsOptional()
    impact?: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

export class DeleteEventDto {
    @IsNumber()
    id: string;
}
