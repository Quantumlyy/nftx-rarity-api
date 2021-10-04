import { ApiProperty } from '@nestjs/swagger';

export class Collectable {
  @ApiProperty()
  public rank: number;
  @ApiProperty()
  public score: number;
}
