import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { FindMessagesByCriteriaRequest } from '../../application/dtos/find-messages-by-criteria-request.dto';
import { FindMessagesByCriteriaResponse } from '../../application/dtos/find-messages-by-criteria-response.dto';
import { messagesConfig } from '../../messages.config';
import { FindMessagesByCriteriaQuery } from '../queries/find-messages-by-criteria.query';
import { FindMessagesByCriteriaSwagger } from '../swagger/decorators/find-messages-by-criteria-swagger.decorator';

const { globalRoute, getController } = messagesConfig;
const { context } = getController.constants;
const { findByCriteria } = getController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class MessageGetController {
	constructor(private readonly queryBus: QueryBus) {}

	@FindMessagesByCriteriaSwagger()
	// @ApiKeyAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@HttpCode(HttpStatus.OK)
	@Get()
	async findByCriteria(
		@Query() request: FindMessagesByCriteriaRequest,
	): Promise<FindMessagesByCriteriaResponse> {
		logger.log(findByCriteria.requestLog);

		const query = new FindMessagesByCriteriaQuery(request);

		return this.queryBus.execute(query);
	}
}
