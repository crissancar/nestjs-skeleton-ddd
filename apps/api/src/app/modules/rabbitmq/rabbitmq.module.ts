import { AmqpConnection, RabbitMQModule as NestJSRabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { DynamicModule, Module } from '@nestjs/common';

import { RabbitMQEventBus } from './infrastructure/services/rabbitmq-event-bus.service';
import { nestjsRabbitmqConfig } from './nestjs-rabbitmq.config';

export interface RabbitMQInstanceConfig {
	exchange: string;
}

@Module({})
export class RabbitMQModule {
	static forRoot(config: RabbitMQInstanceConfig): DynamicModule {
		return {
			module: RabbitMQModule,
			imports: [NestJSRabbitMQModule.forRoot(NestJSRabbitMQModule, nestjsRabbitmqConfig)],
			providers: [
				{
					provide: RabbitMQEventBus,
					inject: [AmqpConnection],
					useFactory: (amqpConnection: AmqpConnection): RabbitMQEventBus => {
						return new RabbitMQEventBus(config, amqpConnection);
					},
				},
			],
			exports: [RabbitMQEventBus],
		};
	}
}
