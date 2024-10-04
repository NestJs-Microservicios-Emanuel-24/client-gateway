import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import {
  PaginationDto,
  ProductActions,
  RpcCustomExceptionFilter,
} from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send(
      { cmd: ProductActions.CREATE },
      createProductDto,
    );
  }

  @Get()
  findProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      { cmd: ProductActions.GET_ALL },
      paginationDto,
    );
  }
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient
      .send({ cmd: ProductActions.GET_ONE_BY_ID }, { id })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
    /*     try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: ProductActions.GET_ONE_BY_ID }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    } */
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient
      .send({ cmd: ProductActions.DELETE }, { id })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsClient
      .send({ cmd: ProductActions.UPDATE }, { id, ...updateProductDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
