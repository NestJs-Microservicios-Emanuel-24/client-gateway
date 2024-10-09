import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';

import { NATS_SERVICE, ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { OrderActions, PaginationDto } from 'src/common';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly cliente: ClientProxy) {}

  @Post()
  createOrden(@Body() createOrderDto: CreateOrderDto) {
    return this.cliente.send(OrderActions.CREATE, createOrderDto);
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return this.cliente.send(OrderActions.CHANGE_STATUS, {
        id,
        status: statusDto.status,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
 async findAllOrden(@Query() orderPaginationDto: OrderPaginationDto) {
    try {
      const orders = await firstValueFrom(
        this.cliente.send(OrderActions.GET_ALL, orderPaginationDto),
      );
      return orders
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      const order = await firstValueFrom(
        this.cliente.send(OrderActions.GET_ALL, {
          ...paginationDto,
          status: statusDto.status,
        }),
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  async findOneOrden(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.cliente.send(OrderActions.GET_ONE_BY_ID, { id }),
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
