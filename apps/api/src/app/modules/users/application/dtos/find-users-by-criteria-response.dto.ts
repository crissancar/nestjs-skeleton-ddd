import { ApiProperty } from '@nestjs/swagger';

import { CriteriaResult } from '../../../shared/domain/interfaces/criteria-result.interface';
import { UserEntity } from '../../infrastructure/persistence/user.entity';
import { UserCriteriaQuery } from '../../infrastructure/persistence/user-criteria.query';
import { userPropertiesSwagger } from '../../infrastructure/swagger/properties/user-properties.swagger';
import { FindUserByIdResponse } from './find-user-by-id-response.dto';

const { usersCriteria } = userPropertiesSwagger;

export class FindUsersByCriteriaResponse {
	@ApiProperty(usersCriteria)
	readonly data: Array<FindUserByIdResponse>;

	readonly count: number;

	readonly currentCount: number;

	readonly take: number;

	readonly page: number;

	constructor(
		data: Array<FindUserByIdResponse>,
		count: number,
		currentCount: number,
		take: number,
		page: number,
	) {
		this.data = data;
		this.count = count;
		this.currentCount = currentCount;
		this.take = take;
		this.page = page;
	}

	static create(
		query: UserCriteriaQuery,
		criteriaResult: CriteriaResult<UserEntity>,
	): FindUsersByCriteriaResponse {
		const { data, count } = criteriaResult;
		const { take, page } = query;
		const currentCount = data.length;

		const findUserResponseArray = data.map((user) => FindUserByIdResponse.create(user));

		return new FindUsersByCriteriaResponse(findUserResponseArray, count, currentCount, take, page);
	}
}
