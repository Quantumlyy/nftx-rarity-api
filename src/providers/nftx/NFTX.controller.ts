import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ethers } from 'ethers';
import { Response } from 'express';
import { BaseProvider, InjectEthersProvider } from 'nestjs-ethers';
import { APIKeyAuthGuard } from 'src/auth/api-key.guard';
import { CollectionService } from 'src/database/Collection.service';
import { Collection } from 'src/database/entitites/Collection.entity';
import { ERC721_BASIC_ABI } from './core/constants';

@ApiTags('NFTX')
@Controller()
export class NFTXController {
  public constructor(
    @InjectEthersProvider()
    private readonly ethersProvider: BaseProvider,
    private readonly collectionService: CollectionService,
  ) {}

  @Get('/collection/:contractAddress')
  @ApiResponse({ type: Collection })
  public async getCollection(
    @Param('contractAddress') contractAddress: string,
  ) {
    return this.collectionService.collection({ contractAddress });
  }

  @UseGuards(APIKeyAuthGuard)
  @Post('/collection/:contractAddress')
  @ApiHeader({
    name: 'X-API-KEY',
  })
  @ApiResponse({ status: 409, description: 'Collection already exists.' })
  @ApiResponse({ type: Collection })
  public async createCollection(
    @Param('contractAddress') contractAddress: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const exists = await this.collectionService.exists({ contractAddress });
    if (exists) {
      return response //
        .status(HttpStatus.CONFLICT)
        .send();
    }

    const contract = new ethers.Contract(
      contractAddress,
      ERC721_BASIC_ABI,
      this.ethersProvider,
    );

    const collection = await this.collectionService.create({
      contractAddress,
      name: await contract.name(),
      symbol: await contract.symbol(),
      size: (await contract.totalSupply()).toNumber(),
      abi: JSON.stringify(ERC721_BASIC_ABI),
    });

    return collection;
  }
}
