import { FindOneOptions } from 'typeorm';

import { GenericEntityClassOrSchema } from '../../shared/domain/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../shared/domain/types/nullable.type';
import { TypeOrmRepository } from '../../shared/infrastructure/persistence/typeorm.repository';
import { ApiKeyRepository } from '../repositories/api-key.repository';
import { ApiKeyEntity } from './api-key.entity';

export class TypeOrmApiKeyRepository
	extends TypeOrmRepository<ApiKeyEntity>
	implements ApiKeyRepository
{
	async find(key: string): Promise<Nullable<ApiKeyEntity>> {
		const options = { where: { key } } as FindOneOptions<ApiKeyEntity>;

		return this.findOneEntity(options);
	}

	protected entitySchema(): GenericEntityClassOrSchema<ApiKeyEntity> {
		return ApiKeyEntity;
	}
}
