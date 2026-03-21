import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from './entities/club.entity';

@Injectable()
export class ClubsService {
  private readonly clubs: Club[] = [
    {
      id: 1,
      name: 'FC Example',
      description: 'A sample football club',
      city: 'Madrid',
      createdAt: new Date().toISOString(),
    },
  ];
  private nextId = 2;

  findAll(): Club[] {
    return this.clubs;
  }

  findOne(id: number): Club {
    const club = this.clubs.find((c) => c.id === id);
    if (!club) throw new NotFoundException(`Club #${id} not found`);
    return club;
  }

  create(dto: CreateClubDto): Club {
    const club: Club = {
      id: this.nextId++,
      name: dto.name,
      description: dto.description ?? '',
      city: dto.city,
      createdAt: new Date().toISOString(),
    };
    this.clubs.push(club);
    return club;
  }

  update(id: number, dto: UpdateClubDto): Club {
    const club = this.findOne(id);
    if (dto.name !== undefined) club.name = dto.name;
    if (dto.description !== undefined) club.description = dto.description;
    if (dto.city !== undefined) club.city = dto.city;
    return club;
  }

  remove(id: number): void {
    const index = this.clubs.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException(`Club #${id} not found`);
    this.clubs.splice(index, 1);
  }
}
