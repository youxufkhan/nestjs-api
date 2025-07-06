import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({ example: 'Whiskers', description: 'The name of the cat' })
  name: string;

  @ApiProperty({ example: 2, description: 'The age of the cat' })
  age: number;

  @ApiProperty({ example: 'Siamese', description: 'The breed of the cat' })
  breed: string;
}
