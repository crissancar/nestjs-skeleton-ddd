import { ClassTransformer } from '../../../shared/application/services/class-transformer.service';
import { CriteriaResult } from '../../../shared/domain/interfaces/criteria-result.interface';
import { GenericEntityClassOrSchema } from '../../../shared/domain/types/generic-entity-class-or-schema.type';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm.repository';
import { FindMessagesByCriteriaRequest } from '../../application/dtos/find-messages-by-criteria-request.dto';
import { Message } from '../../domain/models/message.model';
import { MessageRepository } from '../../domain/repositories/message.repository';
import { MessageEntity } from './message.entity';
import { MessageCriteriaQuery } from './message-criteria.query';

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

	async findByCriteria(request: FindMessagesByCriteriaRequest): Promise<CriteriaResult<Message>> {
		const { where, take, skip, sortOrder, sortColumn } = MessageCriteriaQuery.create(request);

		const builder = this.createTypeOrmQueryBuilder();

		builder.where(where);
		builder.addOrderByColumn(sortColumn, sortOrder);
		builder.pagination(take, skip);

		const { data, count } = await builder.executeGetManyAndCount();

		return {
			data: ClassTransformer.entitiesToModels(data, Message),
			count,
		};
	}

	protected entitySchema(): GenericEntityClassOrSchema<MessageEntity> {
		return MessageEntity;
	}
}
