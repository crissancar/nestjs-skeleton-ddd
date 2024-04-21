import { Message } from '../../domain/models/message.model';

export class CreateMessageResponse {
	readonly id: string;

	readonly eventId: string;

	readonly eventName: string;

	readonly data: unknown;

	constructor(id: string, eventId: string, eventName: string, data: unknown) {
		this.id = id;
		this.eventId = eventId;
		this.eventName = eventName;
		this.data = data;
	}

	static create(message: Message): CreateMessageResponse {
		const { id, eventId, eventName, data } = message;

		return new CreateMessageResponse(id, eventId, eventName, data);
	}
}
