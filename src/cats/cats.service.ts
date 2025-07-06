import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    const cat = this.catRepository.create(createCatDto);
    const savedCat = await this.catRepository.save(cat);
    return { message: 'Cat created successfully', cat: savedCat };
  }

  async findAll() {
    const cats = await this.catRepository.find();
    if (cats.length === 0) {
      return { message: 'No cats found' };
    }
    return cats;
  }

  async findOne(id: number) {
    const cat = await this.catRepository.findOneBy({ id });
    if (!cat) {
      return { message: `Cat with id ${id} not found` };
    }
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.catRepository.findOneBy({ id });
    if (!cat) {
      return { message: `Cat with id ${id} not found` };
    }
    const updatedCat = this.catRepository.merge(cat, updateCatDto);
    const savedCat = await this.catRepository.save(updatedCat);
    return { message: 'Cat updated successfully', cat: savedCat };
  }

  async remove(id: number) {
    const cat = await this.catRepository.findOneBy({ id });
    if (!cat) {
      return { message: `Cat with id ${id} not found` };
    }
    await this.catRepository.remove(cat);
    return { message: `Cat with id ${id} removed successfully` };
  }
}
