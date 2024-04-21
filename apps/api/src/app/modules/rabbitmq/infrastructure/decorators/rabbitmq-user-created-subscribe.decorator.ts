import { MessageHandlerErrorBehavior, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { applyDecorators } from '@nestjs/common';

import { rabbitmqConfig } from '../../rabbitmq.config';

const { users } = rabbitmqConfig;

export const RabbitMQUserCreatedSubscribe = (): MethodDecorator => {
	return applyDecorators(
		RabbitSubscribe({
			exchange: users.exchange,
			routingKey: users.routingKey.create,
			queue: users.queue,
			errorBehavior: MessageHandlerErrorBehavior.ACK,
		}),
	);
};
