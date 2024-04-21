import { Timestamp } from '../../../shared/domain/models/timestamp.model';

export class Message extends Timestamp {
	id: string;

	eventId: string;

	eventName: string;

	data: unknown;

	constructor(id: string, eventId: string, eventName: string, data: unknown) {
		super();
		this.id = id;
		this.eventId = eventId;
		this.eventName = eventName;
		this.data = data;
	}

	static create(id: string, eventId: string, eventName: string, data: unknown): Message {
		return new Message(id, eventId, eventName, data);
	}
}
