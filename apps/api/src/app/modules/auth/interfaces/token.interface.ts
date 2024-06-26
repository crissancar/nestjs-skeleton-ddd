import { UserAudiences } from '../../shared/domain/enums/user-audiences.enum';

export interface Token {
	accessToken: string;
	refreshToken: string;
}

export interface Payload {
	sub: string;
	aud: Array<UserAudiences>;
}
