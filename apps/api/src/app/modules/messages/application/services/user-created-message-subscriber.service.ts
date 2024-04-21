import { Injectable } from '@nestjs/common';

import { RabbitMQUserCreatedSubscribe } from '../../../rabbitmq/infrastructure/decorators/rabbitmq-user-created-subscribe.decorator';
import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { SensitiveDataMasker } from '../../../shared/application/services/sensitive-data-masker.service';
import { Uuid } from '../../../shared/application/services/uuid.service';
import { Sleep } from '../../../shared/infrastructure/decorators/sleep.decorator';
import { UserCreatedDomainEvent } from '../../../users/domain/events/user-created.domain-event';
import { CreateMessageRequest } from '../dtos/create-message-request.dto';
import { MessageCreator } from './message-creator.service';

const logger = LoggerFactory.create('UserCreatedMessageSubscriber');

@Injectable()
export class UserCreatedMessageSubscriber {
	constructor(private readonly creator: MessageCreator) {}

	@RabbitMQUserCreatedSubscribe()
	@Sleep(1500)
	async run(payload: UserCreatedDomainEvent): Promise<void> {
		try {
			const maskedData = SensitiveDataMasker.mask(payload.attributes);

			const request = CreateMessageRequest.create(
				Uuid.random(),
				payload.eventId,
				payload.eventName,
				maskedData,
			);

			await this.creator.run(request);
		} catch (error) {
			logger.error(`Error creating message in database to event ${payload.eventId}`);
		}
	}
}
