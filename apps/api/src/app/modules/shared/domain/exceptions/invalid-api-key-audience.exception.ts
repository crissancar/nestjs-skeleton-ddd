import { HttpException, HttpStatus } from '@nestjs/common';

import { HTTPExceptionData } from '../interfaces/http-exception-data.interface';

export class InvalidApiKeyAudienceException extends HttpException {
	constructor(context: string) {
		const message = 'Invalid api key audience';
		const exceptionData = { message, context } as HTTPExceptionData;

		super(exceptionData, HttpStatus.UNAUTHORIZED);
	}
}
