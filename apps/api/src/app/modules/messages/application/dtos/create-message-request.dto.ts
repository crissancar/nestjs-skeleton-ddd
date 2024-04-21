export class CreateMessageRequest {
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

	static create(
		id: string,
		eventId: string,
		eventName: string,
		data: unknown,
	): CreateMessageRequest {
		return new CreateMessageRequest(id, eventId, eventName, data);
	}
}
