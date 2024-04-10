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
    @Query('browserId', new DefaultValuePipe('')) browserId: string,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.eventsService.findList(browserId, offset, limit);
  }

  @Get(':browserId')
  findOne(@Param('browserId') browserId: string) {
    return this.eventsService.findDetail(browserId);
  }

  @Post()
  create(@Body() creteEventsDto: CreateEventsDto) {
    return this.eventsService.create(creteEventsDto);
  }
}
