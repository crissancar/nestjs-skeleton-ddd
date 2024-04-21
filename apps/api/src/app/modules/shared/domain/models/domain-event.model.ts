/* eslint-disable no-use-before-define */
import { Uuid } from '../../application/services/uuid.service';

export interface DomainEventParams {
	eventName: string;
	aggregateId: string;
	eventId: string;
	occurredOn: Date;
	attributes: unknown;
}

export class DomainEvent {
	readonly eventName: string;

	readonly aggregateId: string;

	readonly eventId: string;

	readonly occurredOn: Date;

	readonly attributes: unknown;

	constructor(params: DomainEventParams) {
		const { aggregateId, eventName, eventId, occurredOn, attributes } = params;
		this.aggregateId = aggregateId;
		this.eventId = eventId || Uuid.random();
		this.occurredOn = occurredOn || new Date();
		this.eventName = eventName;
		this.attributes = attributes;
	}
}
