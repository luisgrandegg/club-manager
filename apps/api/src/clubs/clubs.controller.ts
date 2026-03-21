import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from './entities/club.entity';

@ApiTags('clubs')
@ApiBearerAuth()
@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  @ApiOperation({ summary: 'List all clubs' })
  @ApiResponse({ status: 200, type: [Club] })
  findAll(): Club[] {
    return this.clubsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a club by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Club })
  @ApiResponse({ status: 404, description: 'Club not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Club {
    return this.clubsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new club' })
  @ApiResponse({ status: 201, type: Club })
  @ApiResponse({ status: 400, description: 'Validation error' })
  create(@Body() dto: CreateClubDto): Club {
    return this.clubsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a club' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Club })
  @ApiResponse({ status: 404, description: 'Club not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClubDto,
  ): Club {
    return this.clubsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a club' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Club deleted' })
  @ApiResponse({ status: 404, description: 'Club not found' })
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.clubsService.remove(id);
  }
}
