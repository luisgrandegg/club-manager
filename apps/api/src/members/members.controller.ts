import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser, JwtPayload } from '../common/decorators/current-user.decorator';
import { MembersService } from './members.service';

@ApiTags('members')
@ApiBearerAuth()
@Controller('clubs/:clubId/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @ApiOperation({ summary: 'List members of a club' })
  @ApiParam({ name: 'clubId', type: Number })
  @ApiResponse({ status: 200, description: 'List of memberships' })
  @ApiResponse({ status: 404, description: 'Club not found' })
  listMembers(@Param('clubId', ParseIntPipe) clubId: number) {
    return this.membersService.listMembers(clubId);
  }

  @Post('join')
  @ApiOperation({ summary: 'Join a club' })
  @ApiParam({ name: 'clubId', type: Number })
  @ApiResponse({ status: 201, description: 'Joined successfully' })
  @ApiResponse({ status: 409, description: 'Already a member' })
  join(
    @Param('clubId', ParseIntPipe) clubId: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.membersService.join(clubId, user.sub);
  }

  @Delete('leave')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Leave a club' })
  @ApiParam({ name: 'clubId', type: Number })
  @ApiResponse({ status: 204, description: 'Left successfully' })
  @ApiResponse({ status: 403, description: 'Owner cannot leave' })
  @ApiResponse({ status: 404, description: 'Not a member' })
  leave(
    @Param('clubId', ParseIntPipe) clubId: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.membersService.leave(clubId, user.sub);
  }
}
