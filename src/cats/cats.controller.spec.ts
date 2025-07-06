import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a cat', () => {
      const dto = { name: 'Tom', age: 3, breed: 'Tabby' };
      const result = controller.create(dto);
      expect(result.message).toBe('Cat created successfully');
      expect(result.cat).toMatchObject(dto);
    });
  });

  describe('findAll', () => {
    it('should return all cats', () => {
      controller.create({ name: 'Jerry', age: 2, breed: 'Siamese' });
      const cats = controller.findAll();
      if (Array.isArray(cats)) {
        expect(cats.length).toBeGreaterThan(0);
      } else {
        expect(cats).toHaveProperty('message');
      }
    });
  });

  describe('findOne', () => {
    it('should return a cat by id', () => {
      const { cat } = controller.create({ name: 'Spike', age: 4, breed: 'Bulldog' });
      expect(controller.findOne(cat.id.toString())).toMatchObject(cat);
    });

    it('should return not found message if cat does not exist', () => {
      expect(controller.findOne('999')).toEqual({ message: 'Cat with id 999 not found' });
    });
  });

  describe('update', () => {
    it('should update a cat', () => {
      const { cat } = controller.create({ name: 'Butch', age: 5, breed: 'Persian' });
      const updateDto = { name: 'Butch Updated' };
      const result = controller.update(cat.id.toString(), updateDto);
      expect(result.message).toBe('Cat updated successfully');
      expect(result.cat && result.cat.name).toBe('Butch Updated');
    });

    it('should return not found message if cat does not exist', () => {
      expect(controller.update('999', { name: 'Ghost' })).toEqual({ message: 'Cat with id 999 not found' });
    });
  });

  describe('remove', () => {
    it('should remove a cat', () => {
      const { cat } = controller.create({ name: 'Nibbles', age: 1, breed: 'Maine Coon' });
      const result = controller.remove(cat.id.toString());
      expect(result.message).toBe(`Cat with id ${cat.id} removed successfully`);
      expect(controller.findOne(cat.id.toString())).toEqual({ message: `Cat with id ${cat.id} not found` });
    });

    it('should return not found message if cat does not exist', () => {
      expect(controller.remove('999')).toEqual({ message: 'Cat with id 999 not found' });
    });
  });
});
