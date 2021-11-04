import { ApiProperty } from '@nestjs/swagger';

export class Collection {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;
  @ApiProperty()
  public symbol: string;

  @ApiProperty()
  public contractAddress: string;
  @ApiProperty({ required: false, default: null })
  public abi: string | null;

  @ApiProperty({ required: false, default: null })
  public size: number | null;
}
