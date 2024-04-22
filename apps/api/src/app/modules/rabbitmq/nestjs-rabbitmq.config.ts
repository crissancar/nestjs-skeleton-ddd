import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

import { rabbitmqConfig } from './rabbitmq.config';

const { uri, users } = rabbitmqConfig;

export const nestjsRabbitmqConfig: RabbitMQConfig = {
	uri,
	exchanges: [
		{
			name: users.exchange,
			type: 'topic',
		},
	],
	channels: {
		users: { prefetchCount: 10 },
	},
	queues: [
		{
			name: users.queue,
			exchange: users.exchange,
			createQueueIfNotExists: true,
		},
	],
};
