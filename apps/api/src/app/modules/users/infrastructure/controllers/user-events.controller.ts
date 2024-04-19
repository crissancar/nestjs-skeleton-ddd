import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';

import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';

const logger = LoggerFactory.create('UserEventController');

@Controller()
export class UserEventsController {
	@EventPattern('user.created')
	run(@Payload() payload: unknown, @Ctx() rmqContext: unknown): void {
		logger.debug({ data: payload }, 'UserEventsController');
	}
}
