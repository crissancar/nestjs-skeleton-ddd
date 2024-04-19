import { ClassTransformer } from '../../../shared/application/services/class-transformer.service';
import { GenericEntityClassOrSchema } from '../../../shared/domain/types/generic-entity-class-or-schema.type';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm.repository';
import { User } from '../../domain/aggregates/user.aggregate';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from './user.entity';

export class TypeOrmUserRepository extends TypeOrmRepository<UserEntity> implements UserRepository {
	async create(user: User): Promise<User> {
		const entity = UserEntity.create(user.id, user.name, user.email, user.password);
		const createdEntity = await this.persistEntity(entity);

		return ClassTransformer.entityToModel(createdEntity, User);
	}

	protected entitySchema(): GenericEntityClassOrSchema<UserEntity> {
		return UserEntity;
	}
}
