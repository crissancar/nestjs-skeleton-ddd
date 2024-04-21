import { ICommand } from '@nestjs/cqrs';

import { CreateUserRequest } from '../../application/dtos/create-user-request.dto';

export class CreateUserCommand implements ICommand {
	readonly request: CreateUserRequest;

	constructor(request: CreateUserRequest) {
		this.request = request;
	}
}
