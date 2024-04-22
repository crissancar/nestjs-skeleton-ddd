import { IQuery } from '@nestjs/cqrs';

import { FindMessagesByCriteriaRequest } from '../../application/dtos/find-messages-by-criteria-request.dto';

export class FindMessagesByCriteriaQuery implements IQuery {
	readonly request: FindMessagesByCriteriaRequest;

	constructor(request: FindMessagesByCriteriaRequest) {
		this.request = request;
	}
}
