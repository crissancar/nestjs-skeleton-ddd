import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '../../infrastructure/persistence/user.entity';
import { userPropertiesSwagger } from '../../infrastructure/swagger/properties/user-properties.swagger';

const { id, name, email } = userPropertiesSwagger;

export class FindUserByIdResponse {
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

	static create(foundUser: UserEntity): FindUserByIdResponse {
		const { id, name, email } = foundUser;

		return new FindUserByIdResponse(id, name, email);
	}
}
