import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ConfigType } from '@prisma/client';

export class ConfigDto {
  @IsString()
  key: string;

  @IsString()
  value: string;

  @IsEnum(ConfigType)
  type: ConfigType;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
