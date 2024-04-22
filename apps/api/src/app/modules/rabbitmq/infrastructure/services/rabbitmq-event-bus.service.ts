import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { DomainEvent } from '../../../shared/domain/models/domain-event.model';
import { RabbitMQInstanceConfig } from '../../rabbitmq.module';

const logger = LoggerFactory.create('RabbitMQEventBus');

@Injectable()
export class RabbitMQEventBus {
	constructor(
		private readonly config: RabbitMQInstanceConfig,
		private readonly connection: AmqpConnection,
	) {}

	async publish(aggregate: AggregateRoot<DomainEvent>): Promise<void> {
		const exchange = this.config.exchange;
		const events = aggregate.getUncommittedEvents();

		await Promise.all(
			events.map(async (event) => {
				const { eventName } = event;

				try {
					await this.connection.publish(exchange, eventName, event);

					logger.debug(
						`Message <${event.eventId}> published to exchange <${exchange}> with binding key <${eventName}>`,
					);
				} catch (error) {
					logger.error(
						`Error publishing message <${event.eventId}> to exchange <${exchange}> with binding key <${eventName}>`,
						error,
					);
				}
			}),
		);

		aggregate.commit();
	}
}
