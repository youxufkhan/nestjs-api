import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a cat and return success message', () => {
      const dto = { name: 'Tom', age: 3, breed: 'Tabby' };
      const result = service.create(dto);
      expect(result.message).toBe('Cat created successfully');
      expect(result.cat).toMatchObject(dto);
      expect(result.cat.id).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return all cats', () => {
      service.create({ name: 'Jerry', age: 2, breed: 'Siamese' });
      const cats = service.findAll();
      expect(Array.isArray(cats)).toBe(true);
      if (Array.isArray(cats)) {
        expect(cats.length).toBeGreaterThan(0);
      }
    });

    it('should return message if no cats found', () => {
      service.cats = [];
      expect(service.findAll()).toEqual({ message: 'No cats found' });
    });
  });

  describe('findOne', () => {
    it('should return a cat by id', () => {
      const { cat } = service.create({ name: 'Spike', age: 4, breed: 'Bulldog' });
      expect(service.findOne(cat.id)).toMatchObject(cat);
    });

    it('should return not found message if cat does not exist', () => {
      expect(service.findOne(999)).toEqual({ message: 'Cat with id 999 not found' });
    });
  });

  describe('update', () => {
    it('should update a cat and return success message', () => {
      const { cat } = service.create({ name: 'Butch', age: 5, breed: 'Persian' });
      const updateDto = { name: 'Butch Updated' };
      const result = service.update(cat.id, updateDto);
      expect(result.message).toBe('Cat updated successfully');
      expect(result.cat).toBeDefined();
      expect(result.cat!.name).toBe('Butch Updated');
    });

    it('should return not found message if cat does not exist', () => {
      expect(service.update(999, { name: 'Ghost' })).toEqual({ message: 'Cat with id 999 not found' });
    });
  });

  describe('remove', () => {
    it('should remove a cat and return success message', () => {
      const { cat } = service.create({ name: 'Nibbles', age: 1, breed: 'Maine Coon' });
      const result = service.remove(cat.id);
      expect(result.message).toBe(`Cat with id ${cat.id} removed successfully`);
      expect(service.findOne(cat.id)).toEqual({ message: `Cat with id ${cat.id} not found` });
    });

    it('should return not found message if cat does not exist', () => {
      expect(service.remove(999)).toEqual({ message: 'Cat with id 999 not found' });
    });
  });
});
