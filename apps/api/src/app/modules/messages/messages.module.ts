import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessageCreator } from './application/services/message-creator.service';
import { MessagesFinderByCriteria } from './application/services/messages-finder-by-criteria.service';
import { UserCreatedMessageSubscriber } from './application/services/user-created-message-subscriber.service';
import { MessageGetController } from './infrastructure/controllers/message-get.controller';
import { MessageEntity } from './infrastructure/persistence/message.entity';
import { TypeOrmMessageRepository } from './infrastructure/persistence/typeorm-message.repository';
import { FindMessagesByCriteriaQueryHandler } from './infrastructure/queries/handlers/find-messages-bt-criteria-query.handler';

@Module({
	controllers: [MessageGetController],
	imports: [TypeOrmModule.forFeature([MessageEntity])],
	providers: [
		FindMessagesByCriteriaQueryHandler,
		MessageCreator,
		MessagesFinderByCriteria,
		UserCreatedMessageSubscriber,
		{ provide: 'MessageRepository', useClass: TypeOrmMessageRepository },
	],
})
export class MessagesModule {}
