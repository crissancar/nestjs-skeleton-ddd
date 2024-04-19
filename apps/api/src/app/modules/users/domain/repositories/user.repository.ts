import { User } from '../aggregates/user.aggregate';

export interface UserRepository {
	create(user: User): Promise<User>;
}
