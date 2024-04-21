import { ClassTransformer } from '../../../shared/application/services/class-transformer.service';
import { GenericEntityClassOrSchema } from '../../../shared/domain/types/generic-entity-class-or-schema.type';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm.repository';
import { Message } from '../../domain/models/message.model';
import { MessageRepository } from '../../domain/repositories/message.repository';
import { MessageEntity } from './message.entity';

export class TypeOrmMessageRepository
	extends TypeOrmRepository<MessageEntity>
	implements MessageRepository
{
	async create(message: Message): Promise<Message> {
		const entity = MessageEntity.create(
			message.id,
			message.eventId,
			message.eventName,
			message.data,
		);
		const createdEntity = await this.persistEntity(entity);

		return ClassTransformer.entityToModel(createdEntity, Message);
	}

	protected entitySchema(): GenericEntityClassOrSchema<MessageEntity> {
		return MessageEntity;
	}
}
