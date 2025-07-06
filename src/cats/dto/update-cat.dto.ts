import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCatDto extends PartialType(CreateCatDto) {
  @ApiPropertyOptional({
    example: 'Whiskers',
    description: 'The name of the cat',
  })
  name?: string;

  @ApiPropertyOptional({ example: 2, description: 'The age of the cat' })
  age?: number;

  @ApiPropertyOptional({
    example: 'Siamese',
    description: 'The breed of the cat',
  })
  breed?: string;
}
