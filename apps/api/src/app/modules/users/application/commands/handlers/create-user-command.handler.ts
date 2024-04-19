import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserResponse } from '../../dtos/create-user-response.dto';
import { UserCreator } from '../../services/user-creator.service';
import { CreateUserCommand } from '../create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
	constructor(private readonly creator: UserCreator) {}

	async execute(command: CreateUserCommand): Promise<CreateUserResponse> {
		return this.creator.run(command.request);
	}
}
