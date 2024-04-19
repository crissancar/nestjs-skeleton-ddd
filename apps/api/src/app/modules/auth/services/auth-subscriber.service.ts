import { Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../shared/application/services/logger-factory.service';

const logger = LoggerFactory.create('AuthSubscriber');

@Injectable()
export class AuthSubscriber {
	run(): void {
		logger.log('User created');
	}
}
