import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { CreateUserCommandHandler } from './application/commands/handlers/create-user-command.handler';
import { UserCreatedEventHandler } from './application/events/handlers/user-created-event.handler';
import { UserCreator } from './application/services/user-creator.service';
import { UserEventsController } from './infrastructure/controllers/user-events.controller';
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
		RabbitMQModule.forRoot({ queue: 'users_queue' }),
	],
	controllers: [UserPostController, UserEventsController],
	providers: [
		UserCreator,
		UserEntitySubscriber,
		UserCreatedEventHandler,
		CreateUserCommandHandler,
		{ provide: repositoryInterface, useClass: TypeOrmUserRepository },
	],
	exports: [],
})
export class UsersModule {}
