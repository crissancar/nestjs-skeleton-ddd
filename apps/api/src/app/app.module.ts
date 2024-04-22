import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { loggerConfig } from '../config/logger/logger.config';
import { CorrelationIdMiddleware } from '../config/middlewares/correlation-id.middleware';
import { typeOrmConfig } from '../config/orm/typeorm.config';
import { providersConfig } from './app.config';
import { AppController } from './app.controller';
import { AdminUsersModule } from './modules/admin-users/admin-users.module';
import { ApiKeysModule } from './modules/api-keys/api-keys.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessagesModule } from './modules/messages/messages.module';
import { UsersModule } from './modules/users/users.module';

@Module({
	imports: [
		LoggerModule.forRoot(loggerConfig),
		TypeOrmModule.forRoot(typeOrmConfig),
		CqrsModule.forRoot(),
		AdminUsersModule,
		ApiKeysModule,
		AuthModule,
		UsersModule,
		MessagesModule,
	],
	controllers: [AppController],
	providers: providersConfig,
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(CorrelationIdMiddleware).forRoutes('*');
	}
}
