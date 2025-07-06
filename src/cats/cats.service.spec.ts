import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';

describe('CatsService', () => {
  let service: CatsService;
  let repo: Repository<Cat>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getRepositoryToken(Cat),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    repo = module.get<Repository<Cat>>(getRepositoryToken(Cat));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a cat and return success message', async () => {
      const dto = { name: 'Tom', age: 3, breed: 'Tabby' };
      const savedCat = { id: 1, ...dto };
      jest.spyOn(repo, 'create').mockReturnValue(savedCat as any);
      jest.spyOn(repo, 'save').mockResolvedValue(savedCat as any);
      const result = await service.create(dto);
      expect(result.message).toBe('Cat created successfully');
      expect(result.cat).toMatchObject(dto);
      expect(result.cat.id).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return all cats', async () => {
      const cats = [{ id: 1, name: 'Jerry', age: 2, breed: 'Siamese' }];
      jest.spyOn(repo, 'find').mockResolvedValue(cats as any);
      const result = await service.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect((result as Cat[]).length).toBeGreaterThan(0);
    });

    it('should return message if no cats found', async () => {
      jest.spyOn(repo, 'find').mockResolvedValue([]);
      expect(await service.findAll()).toEqual({ message: 'No cats found' });
    });
  });

  describe('findOne', () => {
    it('should return a cat by id', async () => {
      const cat = { id: 1, name: 'Spike', age: 4, breed: 'Bulldog' };
      jest.spyOn(repo, 'findOneBy').mockResolvedValue(cat as any);
      expect(await service.findOne(1)).toMatchObject(cat);
    });

    it('should return not found message if cat does not exist', async () => {
      jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);
      expect(await service.findOne(999)).toEqual({
        message: 'Cat with id 999 not found',
      });
    });
  });

  describe('update', () => {
    it('should update a cat and return success message', async () => {
      const cat = { id: 1, name: 'Butch', age: 5, breed: 'Persian' };
      const updateDto = { name: 'Butch Updated' };
      const mergedCat = { ...cat, ...updateDto };
      jest.spyOn(repo, 'findOneBy').mockResolvedValue(cat as any);
      jest.spyOn(repo, 'merge').mockReturnValue(mergedCat as any);
      jest.spyOn(repo, 'save').mockResolvedValue(mergedCat as any);
      const result = await service.update(1, updateDto);
      expect(result.message).toBe('Cat updated successfully');
      expect(result.cat).toBeDefined();
      expect(result.cat!.name).toBe('Butch Updated');
    });

    it('should return not found message if cat does not exist', async () => {
      jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);
      expect(await service.update(999, { name: 'Ghost' })).toEqual({
        message: 'Cat with id 999 not found',
      });
    });
  });

  describe('remove', () => {
    it('should remove a cat and return success message', async () => {
      const cat = { id: 1, name: 'Nibbles', age: 1, breed: 'Maine Coon' };
      jest.spyOn(repo, 'findOneBy').mockResolvedValue(cat as any);
      jest.spyOn(repo, 'remove').mockResolvedValue(cat as any);
      const result = await service.remove(cat.id);
      expect(result.message).toBe(`Cat with id ${cat.id} removed successfully`);
    });

    it('should return not found message if cat does not exist', async () => {
      jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);
      expect(await service.remove(999)).toEqual({
        message: 'Cat with id 999 not found',
      });
    });
  });
});
