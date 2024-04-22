import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindMessagesByCriteriaResponse } from '../../../application/dtos/find-messages-by-criteria-response.dto';
import { MessagesFinderByCriteria } from '../../../application/services/messages-finder-by-criteria.service';
import { FindMessagesByCriteriaQuery } from '../find-messages-by-criteria.query';

@QueryHandler(FindMessagesByCriteriaQuery)
export class FindMessagesByCriteriaQueryHandler
	implements IQueryHandler<FindMessagesByCriteriaQuery>
{
	constructor(private readonly finder: MessagesFinderByCriteria) {}

	async execute(query: FindMessagesByCriteriaQuery): Promise<FindMessagesByCriteriaResponse> {
		return this.finder.run(query.request);
	}
}
