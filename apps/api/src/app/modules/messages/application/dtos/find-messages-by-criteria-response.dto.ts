import { ApiProperty } from '@nestjs/swagger';

import { CriteriaResult } from '../../../shared/domain/interfaces/criteria-result.interface';
import { Message } from '../../domain/models/message.model';
import { MessageCriteriaQuery } from '../../infrastructure/persistence/message-criteria.query';
import { messagePropertiesSwagger } from '../../infrastructure/swagger/properties/message-properties.swagger';

const { messagesCriteria } = messagePropertiesSwagger;

export class FindMessagesByCriteriaResponse {
	@ApiProperty(messagesCriteria)
	readonly data: Array<Message>;

	readonly count: number;

	readonly currentCount: number;

	readonly take: number;

	readonly page: number;

	constructor(
		data: Array<Message>,
		count: number,
		currentCount: number,
		take: number,
		page: number,
	) {
		this.data = data;
		this.count = count;
		this.currentCount = currentCount;
		this.take = take;
		this.page = page;
	}

	static create(
		query: MessageCriteriaQuery,
		criteriaResult: CriteriaResult<Message>,
	): FindMessagesByCriteriaResponse {
		const { data, count } = criteriaResult;
		const { take, page } = query;
		const currentCount = data.length;

		return new FindMessagesByCriteriaResponse(data, count, currentCount, take, page);
	}
}
