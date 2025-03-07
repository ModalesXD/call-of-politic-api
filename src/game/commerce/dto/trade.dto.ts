import { IsString, IsNumber, IsEnum, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum TradeStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED'
}

export enum TradeItemType {
  OFFER = 'OFFER',
  REQUEST = 'REQUEST'
}

export class CreateTradeItemDto {
  @ApiProperty()
  @IsString()
  resourceId: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty({ enum: TradeItemType })
  @IsEnum(TradeItemType)
  type: TradeItemType;
}

export class CreateTradeDto {
  @ApiProperty()
  @IsString()
  fromCountryId: string;

  @ApiProperty()
  @IsString()
  toCountryId: string;

  @ApiProperty({ type: [CreateTradeItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTradeItemDto)
  items: CreateTradeItemDto[];
}

export class UpdateTradeDto {
  @ApiProperty({ required: false, enum: TradeStatus })
  @IsOptional()
  @IsEnum(TradeStatus)
  status?: TradeStatus;
}

export class UpdateTradeItemDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  price?: number;
}
