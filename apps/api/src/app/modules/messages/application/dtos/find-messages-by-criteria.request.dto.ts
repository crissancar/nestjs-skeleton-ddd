import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { SortColumn } from '../../../shared/domain/types/sort-column.type';
import { SortOrder } from '../../../shared/domain/types/sort-order.type';
import { ValidatePage } from '../../../shared/infrastructure/decorators/validate-page.decorator';
import { ValidateSortColumn } from '../../../shared/infrastructure/decorators/validate-sort-column.decorator';
import { ValidateSortOrder } from '../../../shared/infrastructure/decorators/validate-sort-order.decorator';
import { ValidateTake } from '../../../shared/infrastructure/decorators/validate-take.decorator';
import { MessageEntity } from '../../infrastructure/persistence/message.entity';
import { messagePropertiesSwagger } from '../../infrastructure/swagger/properties/message-properties.swagger';

const { eventName, keyword, sortName, sortColumn, sortOrder, take, page } =
	messagePropertiesSwagger;

export class FindMessagesByCriteriaRequest {
	@ApiProperty(eventName)
	@IsOptional()
	@IsString()
	readonly eventName?: string;

	@ApiProperty(keyword)
	@IsOptional()
	@IsString()
	readonly keyword?: string;

	@ApiProperty(sortName)
	@IsOptional()
	@IsString()
	readonly sortName?: string;

	@ApiProperty(sortColumn)
	@ValidateSortColumn(MessageEntity)
	readonly sortColumn?: SortColumn<MessageEntity>;

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
