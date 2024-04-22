import { sharedPropertiesSwagger } from '../../../../shared/config/swagger/shared-properties.swagger';

export const messagePropertiesSwagger = {
	...sharedPropertiesSwagger,
	eventName: {
		type: String,
		example: 'user.created',
		required: true,
	},
	messagesCriteria: {
		example: [
			{
				id: 'd594db68-ae8b-425c-a519-ab4bce45b07a',
				eventId: 'd8fdcd22-4c8f-4fa7-9a5f-257519c9b313',
				eventName: 'user.created',
				data: {
					id: '01e88d1f-ffbe-40a1-a14b-b2f8a24a7447',
					name: 'John Doe',
					email: 'john.doe@mail.com',
					password: '*',
				},
			},
			{
				id: 'f9dd4f99-321e-483f-84ab-1f6bc61fff61',
				eventId: 'cf2ca631-0624-4a08-af6e-2114444d6b31',
				eventName: 'user.created',
				data: {
					id: '2503c4cf-dda0-4c41-a556-3f69de8fa0f1',
					name: 'Jane Doe',
					email: 'jane.doe@mail.com',
					password: '*',
				},
			},
		],
	},
};
