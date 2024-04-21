import { isRabbitContext } from '@golevelup/nestjs-rabbitmq';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { LoggerFactory } from '../../app/modules/shared/application/services/logger-factory.service';

const logger = LoggerFactory.create('RabbitMQLoggingInterceptor');

@Injectable()
export class RabbitMQLoggingInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		if (!isRabbitContext(context)) {
			return next.handle();
		}
		const event = context.getArgByIndex(0);
		// const rmqInfo = context.getArgByIndex(1);
		// const exchange = rmqInfo.fields.exchange;
		// const routingKey = rmqInfo.fields.routingKey;

		logger.debug(`Message <${event.eventId}> received correctly and will be served`);

		return next.handle().pipe(
			tap(() => logger.debug(`Message <${event.eventId}> handled successfully`)),
			catchError((error) => {
				logger.error({ data: error }, `Error handling message <${event.eventId}>`, error);

				throw error;
			}),
		);
	}
}
