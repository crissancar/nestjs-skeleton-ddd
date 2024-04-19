import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { LoggerFactory } from '../../../shared/application/services/logger-factory.service';
import { UuidGenerator } from '../../../shared/infrastructure/decorators/uuid-generator.decorator';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { CreateUserRequest } from '../../application/dtos/create-user-request.dto';
import { CreateUserResponse } from '../../application/dtos/create-user-response.dto';
import { usersConfig } from '../../users.config';
import { CreateUserSwagger } from '../swagger/decorators/create-user-swagger.decorator';

const { globalRoute, postController } = usersConfig;
const { context } = postController.constants;
const { requestLog } = postController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class UserPostController {
	constructor(private readonly commandBus: CommandBus) {}

	@CreateUserSwagger()
	// @ApiKeyAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async run(
		@UuidGenerator() id: string,
		@Body() request: CreateUserRequest,
	): Promise<CreateUserResponse> {
		logger.log(requestLog);

		const command = new CreateUserCommand({ ...request, id });

		return this.commandBus.execute(command);
	}
}
