import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateEventsDto } from './events.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  findAll(
    @Query('customerId', new DefaultValuePipe('')) customerId: string,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.eventsService.findList(customerId, offset, limit);
  }

  @Get(':customerId')
  findOne(@Param('customerId') customerId: string) {
    return this.eventsService.findDetail(customerId);
  }

  @Post()
  create(@Body() creteEventsDto: CreateEventsDto) {
    return this.eventsService.create(creteEventsDto);
  }
}
