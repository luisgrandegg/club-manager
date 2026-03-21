import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './entities/club.entity';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private readonly clubsRepo: Repository<Club>,
  ) {}

  findAll(page = 1, limit = 20): Promise<[Club[], number]> {
    return this.clubsRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Club> {
    const club = await this.clubsRepo.findOne({ where: { id } });
    if (!club) throw new NotFoundException(`Club #${id} not found`);
    return club;
  }

  create(dto: CreateClubDto, ownerId: number): Promise<Club> {
    const club = this.clubsRepo.create({ ...dto, ownerId });
    return this.clubsRepo.save(club);
  }

  async update(id: number, dto: UpdateClubDto, requesterId: number): Promise<Club> {
    const club = await this.findOne(id);
    if (club.ownerId !== requesterId) throw new ForbiddenException();
    Object.assign(club, dto);
    return this.clubsRepo.save(club);
  }

  async remove(id: number, requesterId: number): Promise<void> {
    const club = await this.findOne(id);
    if (club.ownerId !== requesterId) throw new ForbiddenException();
    await this.clubsRepo.remove(club);
  }
}
