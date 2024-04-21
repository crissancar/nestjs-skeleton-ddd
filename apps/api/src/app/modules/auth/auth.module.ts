import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ApiKeysModule } from '../api-keys/api-keys.module';
import { UsersModule } from '../users/users.module';
import { jwtConfig } from './config/jwt.config';
import { AuthPostController } from './controllers/auth-post.controller';
import { AuthSubscriber } from './services/auth-subscriber.service';
import { Authenticator } from './services/authenticator.service';
import { JwtCreator } from './services/jwt-creator.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [
		JwtModule.register(jwtConfig),
		ApiKeysModule,
		UsersModule,
		PassportModule,
		// BlacklistsModule,
	],
	controllers: [AuthPostController],
	providers: [AuthSubscriber, Authenticator, JwtCreator, JwtStrategy, LocalStrategy],
	exports: [JwtCreator],
})
export class AuthModule {}
