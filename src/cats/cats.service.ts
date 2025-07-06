import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  cats: Array<Cat> = [];

  create(createCatDto: CreateCatDto) {
    const newCat = new Cat();
    newCat.id = this.cats.length + 1;
    newCat.name = createCatDto.name;
    newCat.age = createCatDto.age;
    newCat.breed = createCatDto.breed;
    this.cats.push(newCat);
    return { message: 'Cat created successfully', cat: newCat };
  }

  findAll() {
    if (this.cats.length === 0) {
      return { message: 'No cats found' };
    }

    return this.cats;
  }

  findOne(id: number) {
    const cat = this.cats.find((cat) => cat.id === id);
    if (!cat) {
      return { message: `Cat with id ${id} not found` };
    }
    return cat;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    const catIndex = this.cats.findIndex((cat) => cat.id === id);
    if (catIndex === -1) {
      return { message: `Cat with id ${id} not found` };
    }

    const updatedCat = { ...this.cats[catIndex], ...updateCatDto };
    this.cats[catIndex] = updatedCat;
    return { message: 'Cat updated successfully', cat: updatedCat };
  }

  remove(id: number) {
    const catIndex = this.cats.findIndex((cat) => cat.id === id);
    if (catIndex === -1) {
      return { message: `Cat with id ${id} not found` };
    }
    this.cats.splice(catIndex, 1);
    return { message: `Cat with id ${id} removed successfully` };
  }
}
