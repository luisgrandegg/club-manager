import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubsModule } from '../clubs/clubs.module';
import { Membership } from './entities/membership.entity';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';

@Module({
  imports: [TypeOrmModule.forFeature([Membership]), ClubsModule],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
