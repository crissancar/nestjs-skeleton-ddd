import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ApiKeysModule } from '../api-keys/api-keys.module';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { UsersModule } from '../users/users.module';
import { jwtConfig } from './config/jwt.config';
import { AuthEventsController } from './controllers/auth-events.controller';
import { AuthPostController } from './controllers/auth-post.controller';
import { AuthSubscriber } from './services/auth-subscriber.service';
import { Authenticator } from './services/authenticator.service';
import { JwtCreator } from './services/jwt-creator.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [
		JwtModule.register(jwtConfig),
		RabbitMQModule.forRoot({ queue: 'auth_queue' }),
		// RabbitMQModule.forRoot({ queue: 'users_queue' }),
		ApiKeysModule,
		UsersModule,
		PassportModule,
		// BlacklistsModule,
	],
	controllers: [AuthPostController, AuthEventsController],
	providers: [AuthSubscriber, Authenticator, JwtCreator, JwtStrategy, LocalStrategy],
	exports: [JwtCreator],
})
export class AuthModule {}
