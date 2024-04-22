import { FindOptionsWhere } from 'typeorm';

import { CriteriaQuery } from '../../../shared/domain/interfaces/criteria-query.interface';
import { SortColumn } from '../../../shared/domain/types/sort-column.type';
import { SortOrder } from '../../../shared/domain/types/sort-order.type';
import { FindMessagesByCriteriaRequest } from '../../application/dtos/find-messages-by-criteria-request.dto';
import { MessageEntity } from './message.entity';

export class MessageCriteriaQuery implements CriteriaQuery<MessageEntity> {
	readonly where: FindOptionsWhere<MessageEntity>;

	readonly eventName: string;

	readonly take: number;

	readonly page: number;

	readonly skip: number;

	readonly sortColumn: SortColumn<MessageEntity>;

	readonly sortOrder: SortOrder;

	constructor(
		where: FindOptionsWhere<MessageEntity>,
		eventName: string,
		take: number,
		page: number,
		sortColumn: SortColumn<MessageEntity>,
		sortOrder: SortOrder,
	) {
		this.where = where;
		this.eventName = eventName;
		this.take = take ?? 10;
		this.page = page ?? 1;
		this.skip = (this.page - 1) * this.take;
		this.sortColumn = sortColumn ?? 'createdAt';
		this.sortOrder = sortOrder ?? 'DESC';
	}

	static create(request: FindMessagesByCriteriaRequest): MessageCriteriaQuery {
		const { eventName, take, page, sortColumn, sortOrder } = request;

		const where = this.createFindOptionsWhere(eventName);

		return new MessageCriteriaQuery(where, eventName, take, page, sortColumn, sortOrder);
	}

	private static createFindOptionsWhere(eventName: string): FindOptionsWhere<MessageEntity> {
		return {
			...(eventName && { eventName }),
		};
	}
}
