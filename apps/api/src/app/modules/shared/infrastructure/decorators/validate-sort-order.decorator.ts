import { applyDecorators } from '@nestjs/common';
import { IsIn, IsOptional, ValidateIf } from 'class-validator';

import { SortOrder } from '../../domain/types/sort-order.type';

const sortOrders: SortOrder[] = ['ASC', 'DESC'];

export const ValidateSortOrder = (): PropertyDecorator =>
	applyDecorators(
		IsOptional(),
		ValidateIf((object, value) => value !== undefined),
		IsIn(sortOrders),
	);
