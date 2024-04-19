import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserCreatedDomainEvent } from '../../../domain/events/user-created.domain-event';

@EventsHandler(UserCreatedDomainEvent)
export class UserCreatedEventHandler implements IEventHandler<UserCreatedDomainEvent> {
	handle(event: UserCreatedDomainEvent): void {
		console.log('UserCreatedEventHandler');
	}
}
