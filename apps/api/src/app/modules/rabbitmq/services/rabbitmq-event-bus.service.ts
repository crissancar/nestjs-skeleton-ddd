import { AggregateRoot } from '@nestjs/cqrs';
import { ClientRMQ } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { LoggerFactory } from '../../shared/application/services/logger-factory.service';
import { DomainEvent } from '../../shared/domain/models/domain-event.model';
import { RabbitMQConfig } from '../rabbitmq.module';

const logger = LoggerFactory.create('RabbitMQEventBus');

export class RabbitMQEventBus extends ClientRMQ {
	private static connection: ClientRMQ;
	private readonly config: RabbitMQConfig;

	constructor(config: RabbitMQConfig) {
		super({
			urls: ['amqps://gtpxvtbs:SI4GqOE8sm7Zryv9b5xqlTcBqBXdd-92@rat.rmq2.cloudamqp.com/gtpxvtbs'],
			queue: config.queue,
			queueOptions: { durable: true },
		});
		this.config = config;
		if (!RabbitMQEventBus.connection) {
			logger.log('Connecting to RabbitMQ');
			RabbitMQEventBus.connection = this;
		}
	}

	static getConnection(): ClientRMQ {
		if (!this.connection) {
			throw new Error('RabbitMQEventBus not connected');
		}

		return this.connection;
	}

	emitAggregateEvents(aggregate: AggregateRoot<DomainEvent>): void {
		const uncommittedEvents = aggregate.getUncommittedEvents();
		uncommittedEvents.forEach((event) => {
			const { eventName } = event;
			try {
				this.emit(eventName, event);
				logger.log(`Event <${eventName}> emitted to queue <${this.config.queue}>`);
			} catch (error) {
				logger.error(`Error emitting event <${eventName}> to queue <${this.config.queue}>`, error);
			}
		});
		aggregate.commit();
	}

	emitEvent(data: unknown): void {
		try {
			this.emit('auth.trial', data);
			logger.log(`Event <auth.trial> emitted to queue <${this.config.queue}>`);
		} catch (error) {
			logger.error(`Error emitting event <auth.trial>  to queue <${this.config.queue}>`, error);
		}
	}

	sendEvent<T = any>(event: string, data: unknown): Observable<T> {
		try {
			logger.log(`Event <${event}> sent to queue <${this.config.queue}>`);

			return this.send(event, data);
		} catch (error) {
			logger.error(`Error sending event <${event}>  to queue <${this.config.queue}>`, error);
		}
	}
}
