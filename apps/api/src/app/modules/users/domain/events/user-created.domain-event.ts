import { DomainEvent } from '../../../shared/domain/models/domain-event.model';

export class UserCreatedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME = 'user.created';

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	constructor({ aggregateId, eventId, occurredOn }) {
		super({
			eventName: UserCreatedDomainEvent.EVENT_NAME,
			aggregateId,
			eventId,
			occurredOn,
		});
	}

	toPrimitives(): never {
		return {} as never;
	}
}
