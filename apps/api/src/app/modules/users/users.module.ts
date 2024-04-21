import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { UserCreator } from './application/services/user-creator.service';
import { CreateUserCommandHandler } from './infrastructure/commands/handlers/create-user-command.handler';
import { UserPostController } from './infrastructure/controllers/user-post.controller';
import { TypeOrmUserRepository } from './infrastructure/persistence/typeorm-user.repository';
import { UserEntity } from './infrastructure/persistence/user.entity';
import { UserEntitySubscriber } from './infrastructure/persistence/user-entity.subscriber';
import { usersConfig } from './users.config';

const { repositoryInterface } = usersConfig.repository;

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		CqrsModule.forRoot(),
		RabbitMQModule.forRoot({ exchange: 'users_exchange' }),
	],
	controllers: [UserPostController],
	providers: [
		UserCreator,
		UserEntitySubscriber,
		CreateUserCommandHandler,
		{ provide: repositoryInterface, useClass: TypeOrmUserRepository },
	],
	exports: [],
})
export class UsersModule {}
