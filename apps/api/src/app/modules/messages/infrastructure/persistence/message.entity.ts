import { Column, Entity, PrimaryColumn } from 'typeorm';

import { TimestampEntity } from '../../../shared/infrastructure/persistence/timestamp.entity';
import { messagesConfig } from '../../messages.config';

const { entity } = messagesConfig;

@Entity(entity)
export class MessageEntity extends TimestampEntity {
	@PrimaryColumn({ update: false })
	id: string;

	@Column()
	eventId: string;

	@Column()
	eventName: string;

	@Column({ type: 'jsonb' })
	data: unknown;

	constructor(id: string, eventId: string, eventName: string, data: unknown) {
		super();
		this.id = id;
		this.eventId = eventId;
		this.eventName = eventName;
		this.data = data;
	}

	static create(id: string, eventId: string, eventName: string, data: unknown): MessageEntity {
		return new MessageEntity(id, eventId, eventName, data);
	}
}
