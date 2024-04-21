import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessageCreator } from './application/services/message-creator.service';
import { UserCreatedMessageSubscriber } from './application/services/user-created-message-subscriber.service';
import { MessageEntity } from './infrastructure/persistence/message.entity';
import { TypeOrmMessageRepository } from './infrastructure/persistence/typeorm-message.repository';

@Module({
	imports: [TypeOrmModule.forFeature([MessageEntity])],
	providers: [
		UserCreatedMessageSubscriber,
		MessageCreator,
		{ provide: 'MessageRepository', useClass: TypeOrmMessageRepository },
	],
})
export class MessagesModule {}
