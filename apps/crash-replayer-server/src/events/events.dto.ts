/*
 * @Author: Hong.Zhang
 * @Date: 2024-04-03 17:01:18
 * @Description:
 */
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventsDto {
  @IsString()
  error: string;

  @IsString()
  @IsOptional()
  source: string;

  @IsNumber()
  @IsOptional()
  lineno: number;

  @IsNumber()
  @IsOptional()
  colno: number;

  @IsString()
  browserId: string;

  @IsString()
  @IsOptional()
  customerId: string;

  @IsString()
  events: string;
}
