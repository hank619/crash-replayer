import { Module } from '@nestjs/common';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';

@Module({
  imports: [],
  controllers: [EventsController],
  providers: [EventsService],
})
export class AppModule {}
