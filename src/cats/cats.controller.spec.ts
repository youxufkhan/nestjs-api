import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a cat', async () => {
      const dto = { name: 'Tom', age: 3, breed: 'Tabby' };
      const resultData = {
        message: 'Cat created successfully',
        cat: { id: 1, ...dto },
      };
      jest.spyOn(service, 'create').mockResolvedValue(resultData as any);
      const result = await controller.create(dto);
      expect(result).toEqual(resultData);
    });
  });

  describe('findAll', () => {
    it('should return all cats', async () => {
      const cats = [{ id: 1, name: 'Jerry', age: 2, breed: 'Siamese' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(cats as any);
      const result = await controller.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect((result as any[]).length).toBeGreaterThan(0);
    });

    it('should return message if no cats found', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue({ message: 'No cats found' });
      expect(await controller.findAll()).toEqual({ message: 'No cats found' });
    });
  });

  describe('findOne', () => {
    it('should return a cat by id', async () => {
      const cat = { id: 1, name: 'Spike', age: 4, breed: 'Bulldog' };
      jest.spyOn(service, 'findOne').mockResolvedValue(cat as any);
      expect(await controller.findOne('1')).toMatchObject(cat);
    });

    it('should return not found message if cat does not exist', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue({ message: 'Cat with id 999 not found' });
      expect(await controller.findOne('999')).toEqual({
        message: 'Cat with id 999 not found',
      });
    });
  });

  describe('update', () => {
    it('should update a cat', async () => {
      const updateDto = { name: 'Butch Updated' };
      const resultData = {
        message: 'Cat updated successfully',
        cat: { id: 1, name: 'Butch Updated', age: 5, breed: 'Persian' },
      };
      jest.spyOn(service, 'update').mockResolvedValue(resultData as any);
      const result = await controller.update('1', updateDto);
      expect(result).toEqual(resultData);
    });

    it('should return not found message if cat does not exist', async () => {
      jest
        .spyOn(service, 'update')
        .mockResolvedValue({ message: 'Cat with id 999 not found' });
      expect(await controller.update('999', { name: 'Ghost' })).toEqual({
        message: 'Cat with id 999 not found',
      });
    });
  });

  describe('remove', () => {
    it('should remove a cat', async () => {
      const resultData = { message: 'Cat with id 1 removed successfully' };
      jest.spyOn(service, 'remove').mockResolvedValue(resultData as any);
      const result = await controller.remove('1');
      expect(result).toEqual(resultData);
    });

    it('should return not found message if cat does not exist', async () => {
      jest
        .spyOn(service, 'remove')
        .mockResolvedValue({ message: 'Cat with id 999 not found' });
      expect(await controller.remove('999')).toEqual({
        message: 'Cat with id 999 not found',
      });
    });
  });
});
