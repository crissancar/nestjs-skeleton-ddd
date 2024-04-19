/* eslint-disable no-console */
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { AdminUserEntity } from '../../../src/app/modules/admin-users/persistence/admin-user.entity';
import { Bcrypt } from '../../../src/app/modules/shared/application/services/bcrypt.service';
import { config } from '../../../src/config/app/index';

const { seeds } = config.typeorm;

export default class AdminUserSeed implements Seeder {
	async run(dataSource: DataSource): Promise<void> {
		const name = seeds.name;
		const email = seeds.email;
		const password = Bcrypt.hash(seeds.password);
		const audience = seeds.adminUserAudience;

		const adminUserEntity = AdminUserEntity.create(name, email, password, audience);

		try {
			await dataSource.createEntityManager().save<AdminUserEntity>(adminUserEntity);
			console.log(' -> Admin User created :)');
		} catch (error) {
			console.log(' -> data already exists :)');
		}
	}
}
