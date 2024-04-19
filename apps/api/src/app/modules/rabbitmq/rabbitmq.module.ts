import { DynamicModule, Module } from '@nestjs/common';

import { RabbitMQEventBus } from './services/rabbitmq-event-bus.service';

export interface RabbitMQConfig {
	queue: string;
}

@Module({})
export class RabbitMQModule {
	static modules: Record<string, DynamicModule> = {};

	static forRoot(options: RabbitMQConfig): DynamicModule {
		return {
			module: RabbitMQModule,
			providers: [
				{
					provide: 'RabbitMQEventBus',
					useValue: new RabbitMQEventBus(options),
				},
			],
			exports: ['RabbitMQEventBus'],
		};
	}
}
