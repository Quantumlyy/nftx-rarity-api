import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { ethers } from 'ethers';
import { BaseProvider, InjectEthersProvider } from 'nestjs-ethers';
import { APIKeyAuthGuard } from 'src/auth/api-key.guard';
import { CollectionService } from 'src/database/Collection.service';

@ApiTags('NFTX')
@Controller()
export class NFTXController {
  public constructor(
    @InjectEthersProvider()
    private readonly ethersProvider: BaseProvider,
    private readonly collectionService: CollectionService,
  ) {}

  @UseGuards(APIKeyAuthGuard)
  @Post('/collection/:contractAddress')
  @ApiHeader({
    name: 'X-API-KEY',
  })
  async createCollection(@Param('contractAddress') contractAddress: string) {
    const contractABIResponse = await fetch<EtherscanABIResponse>(
      // TODO(@quantumlyy): Include API key
      `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}`,
      FetchResultTypes.JSON,
    );

    const contract = new ethers.Contract(
      contractAddress,
      contractABIResponse.result,
      this.ethersProvider,
    );

    const collection = await this.collectionService.create({
      contractAddress,
      name: await contract.name(),
      symbol: await contract.symbol(),
      size: (await contract.totalSupply()).toNumber(),
      abi: contractABIResponse.result,
    });

    return collection;
  }
}

interface EtherscanABIResponse {
  status: string;
  message: string;
  result: string;
}
