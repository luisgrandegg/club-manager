import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateClubDto {
  @ApiProperty({ example: 'FC Example', description: 'Club name', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'A premier football club', description: 'Short description', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ example: 'Madrid', description: 'City where the club is based' })
  @IsString()
  @IsNotEmpty()
  city: string;
}
