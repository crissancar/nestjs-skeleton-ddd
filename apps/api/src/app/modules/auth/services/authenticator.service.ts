import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../users/infrastructure/persistence/user.entity';
import { authConfig } from '../config/auth.config';
import { AuthenticatedUser } from '../dtos/authenticated-user.dto';
import { LoginUserRequest } from '../dtos/login-user-request.dto';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';

const { authenticator } = authConfig;
const { context } = authenticator.constants;

@Injectable()
export class Authenticator {
	constructor() {} // private readonly blacklistUserChecker: BlacklistUserChecker, // private readonly userFinder: UserFinderForAuthentication,

	async run(request: LoginUserRequest): Promise<AuthenticatedUser> {
		// const user = await this.getUser(request.email);
		//
		// await this.checkUserBlocked(user);
		const user = {} as UserEntity;

		this.checkUserAuthentication(request, user);

		return AuthenticatedUser.create(user);
	}

	// private async getUser(email: string): Promise<UserEntity> {
	// 	const request = FindUserByEmailRequest.create(email);
	//
	// 	return this.userFinder.run(request);
	// }
	//
	// private async checkUserBlocked(user: UserEntity): Promise<void> {
	// 	const request = CheckBlacklistUserRequest.create(user.id);
	//
	// 	await this.blacklistUserChecker.run(request);
	// }

	private checkUserAuthentication(request: LoginUserRequest, user: UserEntity): void {
		const { password: requestPassword } = request;
		const { password: userPassword } = user;

		if (!UserEntity.comparePasswords(requestPassword, userPassword)) {
			throw new InvalidCredentialsException(context);
		}
	}
}
