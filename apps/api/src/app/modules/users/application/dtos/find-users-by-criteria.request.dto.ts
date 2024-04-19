import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

import { SortColumn } from '../../../shared/domain/types/sort-column.type';
import { SortOrder } from '../../../shared/domain/types/sort-order.type';
import { ValidatePage } from '../../../shared/infrastructure/decorators/validate-page.decorator';
import { ValidateSortColumn } from '../../../shared/infrastructure/decorators/validate-sort-column.decorator';
import { ValidateSortOrder } from '../../../shared/infrastructure/decorators/validate-sort-order.decorator';
import { ValidateTake } from '../../../shared/infrastructure/decorators/validate-take.decorator';
import { UserEntity } from '../../infrastructure/persistence/user.entity';
import { userPropertiesSwagger } from '../../infrastructure/swagger/properties/user-properties.swagger';

const { name, keyword, email, take, page, sortName, sortOrder, sortColumn } = userPropertiesSwagger;

export class FindUsersByCriteriaRequest {
	@ApiProperty(name)
	@IsOptional()
	@IsString()
	readonly name?: string;

	@ApiProperty(email)
	@IsOptional()
	@IsEmail()
	readonly email?: string;

	@ApiProperty(keyword)
	@IsOptional()
	@IsString()
	readonly keyword?: string;

	@ApiProperty(sortName)
	@IsOptional()
	@IsString()
	readonly sortName?: string;

	@ApiProperty(sortColumn)
	@ValidateSortColumn(UserEntity)
	readonly sortColumn?: SortColumn<UserEntity>;

	@ApiProperty(sortOrder)
	@ValidateSortOrder()
	readonly sortOrder?: SortOrder;

	@ApiProperty(take)
	@ValidateTake()
	readonly take?: number;

	@ApiProperty(page)
	@ValidatePage()
	readonly page?: number;
}
