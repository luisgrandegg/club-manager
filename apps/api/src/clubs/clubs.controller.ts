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
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from './entities/club.entity';
import { CurrentUser, JwtPayload } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('clubs')
@ApiBearerAuth()
@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'List all clubs (paginated)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Paginated list of clubs' })
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 20,
  ) {
    const [items, total] = await this.clubsService.findAll(page, limit);
    return { items, total, page, limit };
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get a club by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Club })
  @ApiResponse({ status: 404, description: 'Club not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Club> {
    return this.clubsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new club' })
  @ApiResponse({ status: 201, type: Club })
  @ApiResponse({ status: 400, description: 'Validation error' })
  create(
    @Body() dto: CreateClubDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<Club> {
    return this.clubsService.create(dto, user.sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a club (owner only)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Club })
  @ApiResponse({ status: 403, description: 'Forbidden — not the owner' })
  @ApiResponse({ status: 404, description: 'Club not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClubDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<Club> {
    return this.clubsService.update(id, dto, user.sub);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a club (owner only)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Club deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden — not the owner' })
  @ApiResponse({ status: 404, description: 'Club not found' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ): Promise<void> {
    return this.clubsService.remove(id, user.sub);
  }
}
