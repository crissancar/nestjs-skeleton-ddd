import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

import { rabbitmqConfig } from './rabbitmq.config';

const { uri, users } = rabbitmqConfig;

export const nestjsRabbitmqConfig: RabbitMQConfig = {
	uri,
	exchanges: [
		{ name: users.exchange, type: 'topic' },
		{ name: 'auth_exchange', type: 'topic' },
		{ name: 'api_keys_exchange', type: 'topic' },
	],
	channels: {
		users: { prefetchCount: 10 },
		auth: { prefetchCount: 10 },
		api_keys: { prefetchCount: 10 },
	},
	queues: [
		{
			name: users.queue,
			exchange: users.exchange,
			createQueueIfNotExists: true,
		},
	],
};
