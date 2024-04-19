import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { config } from '../../../../config/app';
import { FindUserForStrategyResponse } from '../../users/application/dtos/find-user-for-strategy-response.dto';
import { authConfig } from '../config/auth.config';
import { Payload } from '../interfaces/token.interface';

const { jwt } = config;
const { jwtStrategy } = authConfig;
const { strategyName } = jwtStrategy.constants;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, strategyName) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwt.secret,
		});
	}

	async validate(jwtPayload: Payload): Promise<FindUserForStrategyResponse> {
		const { sub } = jwtPayload;

		// return this.userFinder.run({ id: sub });
		return {} as FindUserForStrategyResponse;
	}
}
