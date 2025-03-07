import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum MarketOrderType {
  BUY = 'BUY',
  SELL = 'SELL'
}

export enum MarketOrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export class CreateMarketOrderDto {
  @ApiProperty()
  @IsString()
  resourceId: string;

  @ApiProperty()
  @IsString()
  countryId: string;

  @ApiProperty({ enum: MarketOrderType })
  @IsEnum(MarketOrderType)
  type: MarketOrderType;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNumber()
  price: number;
}

export class UpdateMarketOrderDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ required: false, enum: MarketOrderStatus })
  @IsOptional()
  @IsEnum(MarketOrderStatus)
  status?: MarketOrderStatus;
}
