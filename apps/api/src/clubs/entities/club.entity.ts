import { ApiProperty } from '@nestjs/swagger';

export class Club {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @ApiProperty({ example: 'FC Example', description: 'Club name' })
  name: string;

  @ApiProperty({ example: 'A premier football club', description: 'Short description' })
  description: string;

  @ApiProperty({ example: 'Madrid', description: 'City where the club is based' })
  city: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Creation timestamp' })
  createdAt: string;
}
