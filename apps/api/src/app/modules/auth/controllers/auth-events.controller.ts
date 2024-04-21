// import { Controller, Inject } from '@nestjs/common';
// import { Ctx, EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
// import { firstValueFrom } from 'rxjs';
//
// import { RabbitMQEventBus } from '../../rabbitmq/services/rabbitmq-event-bus.service';
// import { LoggerFactory } from '../../shared/application/services/logger-factory.service';
//
// const logger = LoggerFactory.create('AuthEventsController');
//
// @Controller()
// export class AuthEventsController {
// 	constructor(@Inject('RabbitMQEventBus') private readonly eventBus: RabbitMQEventBus) {}
//
// 	@EventPattern('user.created')
// 	async run(@Payload() payload: unknown, @Ctx() rmqContext: unknown) {
// 		logger.debug('AuthEventsController listen user.created');
// 		// this.eventBus.emitEvent({ eventName: 'auth.trial', ocurredOn: new Date() });
// 		const r = await firstValueFrom(
// 			this.eventBus.sendEvent('auth.message', { eventName: 'auth.message', ocurredOn: new Date() }),
// 		);
//
// 		logger.debug({ data: r }, 'AuthEventsController result from auth.message');
// 	}
//
// 	@MessagePattern('auth.message')
// 	trial(@Payload() payload: unknown, @Ctx() rmqContext: unknown) {
// 		logger.debug('AuthEventsController listen auth.message');
//
// 		return payload;
// 	}
// }
