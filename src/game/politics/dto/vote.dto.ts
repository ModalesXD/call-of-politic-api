import { IsNumber, IsString, IsNotEmpty, IsOptional, IsArray, IsBoolean } from "class-validator";

export class CreateVoteDto {
    @IsString()
    @IsNotEmpty()
    countryId: string;

    @IsString()
    @IsNotEmpty()
    electionId: string;

    @IsString()
    @IsNotEmpty()
    playerElectionId: string;
}

export class UpdateVoteDto {
    @IsString()
    @IsOptional()
    countryId?: string;

    @IsString()
    @IsOptional()
    electionId?: string;

    @IsString()
    @IsOptional()
    playerElectionId?: string;

}