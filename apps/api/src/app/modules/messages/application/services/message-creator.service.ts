import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { Message } from '../../domain/models/message.model';
import { MessageRepository } from '../../domain/repositories/message.repository';
import { messagesConfig } from '../../messages.config';
import { CreateMessageRequest } from '../dtos/create-message-request.dto';
import { CreateMessageResponse } from '../dtos/create-message-response.dto';

const { creator, repository } = messagesConfig;
const { repositoryInterface } = repository;
const { context } = creator.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class MessageCreator {
	constructor(@Inject(repositoryInterface) private readonly repository: MessageRepository) {}

	async run(request: CreateMessageRequest): Promise<CreateMessageResponse> {
		const message = Message.create(request.id, request.eventId, request.eventName, request.data);

		try {
			const createdMessage = await this.repository.create(message);

			return CreateMessageResponse.create(createdMessage);
		} catch (error) {
			logger.error(error);
			throw error;
		}
	}
}
