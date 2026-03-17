import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateClubDto {
  @ApiProperty({ example: 'FC Example Updated', description: 'Club name', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @ApiProperty({ example: 'Updated description', description: 'Short description', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ example: 'Barcelona', description: 'City where the club is based', required: false })
  @IsString()
  @IsOptional()
  city?: string;
}
