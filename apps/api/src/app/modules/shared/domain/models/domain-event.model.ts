/* eslint-disable no-use-before-define */
import { Uuid } from '../../application/services/uuid.service';

export interface DomainEventParams {
	eventName: string;
	aggregateId: string;
	eventId: string;
	occurredOn: Date;
}
export interface DomainEventFromPrimitives {
	toPrimitives(): never;
}

export abstract class DomainEvent implements DomainEventFromPrimitives {
	static fromPrimitives: (params: DomainEventFromPrimitives) => DomainEvent;

	readonly eventName: string;

	readonly aggregateId: string;

	readonly eventId: string;

	readonly occurredOn: Date;

	protected constructor(params: DomainEventParams) {
		const { aggregateId, eventName, eventId, occurredOn } = params;
		this.aggregateId = aggregateId;
		this.eventId = eventId || Uuid.random();
		this.occurredOn = occurredOn || new Date();
		this.eventName = eventName;
	}

	abstract toPrimitives(): never;
}

export type DomainEventClass = {
	EVENT_NAME: string;
	QUEUE: string;
	fromPrimitives(params: DomainEventFromPrimitives): DomainEvent;
};
