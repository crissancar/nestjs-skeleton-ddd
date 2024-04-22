import { Inject, Injectable } from '@nestjs/common';

import { MessageRepository } from '../../domain/repositories/message.repository';
import { messagesConfig } from '../../messages.config';
import { FindMessagesByCriteriaRequest } from '../dtos/find-messages-by-criteria-request.dto';
import { FindMessagesByCriteriaResponse } from '../dtos/find-messages-by-criteria-response.dto';

const { repositoryInterface } = messagesConfig.repository;

@Injectable()
export class MessagesFinderByCriteria {
	constructor(@Inject(repositoryInterface) private readonly repository: MessageRepository) {}

	async run(request: FindMessagesByCriteriaRequest): Promise<FindMessagesByCriteriaResponse> {
		const criteriaResult = await this.repository.findByCriteria(request);

		return FindMessagesByCriteriaResponse.create(request, criteriaResult);
	}
}
