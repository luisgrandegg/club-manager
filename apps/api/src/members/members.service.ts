import {
  Injectable,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from './entities/membership.entity';
import { ClubsService } from '../clubs/clubs.service';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipsRepo: Repository<Membership>,
    private readonly clubsService: ClubsService,
  ) {}

  async join(clubId: number, userId: number): Promise<Membership> {
    await this.clubsService.findOne(clubId);

    const existing = await this.membershipsRepo.findOne({
      where: { clubId, userId },
    });
    if (existing) throw new ConflictException('Already a member of this club');

    const membership = this.membershipsRepo.create({ clubId, userId });
    return this.membershipsRepo.save(membership);
  }

  async leave(clubId: number, userId: number): Promise<void> {
    const club = await this.clubsService.findOne(clubId);

    if (club.ownerId === userId) {
      throw new ForbiddenException('The club owner cannot leave their own club');
    }

    const membership = await this.membershipsRepo.findOne({
      where: { clubId, userId },
    });
    if (!membership) throw new NotFoundException('Not a member of this club');

    await this.membershipsRepo.remove(membership);
  }

  async listMembers(clubId: number) {
    await this.clubsService.findOne(clubId); // 404 if not found
    return this.membershipsRepo.find({
      where: { clubId },
      relations: ['user'],
      order: { joinedAt: 'ASC' },
    });
  }
}
