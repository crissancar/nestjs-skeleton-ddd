import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../domain/aggregates/user.aggregate';
import { userPropertiesSwagger } from '../../infrastructure/swagger/properties/user-properties.swagger';

const { id, name, email } = userPropertiesSwagger;

export class CreateUserResponse {
	@ApiProperty(id)
	readonly id: string;

	@ApiProperty(name)
	readonly name: string;

	@ApiProperty(email)
	readonly email: string;

	constructor(id: string, name: string, email: string) {
		this.id = id;
		this.name = name;
		this.email = email;
	}

	static create(createdUser: User): CreateUserResponse {
		const { id, name, email } = createdUser;

		return new CreateUserResponse(id, name, email);
	}
}
