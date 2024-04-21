import { sharedPropertiesSwagger } from '../../../../shared/config/swagger/shared-properties.swagger';

export const messagePropertiesSwagger = {
	...sharedPropertiesSwagger,
	eventName: {
		type: String,
		example: 'user.created',
		required: true,
	},
	sortName: {
		type: String,
		description: 'Sort the response by user name',
		example: 'API',
		required: false,
	},
	messagesCriteria: {
		example: [
			{
				id: 'd77b8d13-550c-4579-8f57-dfdda982448b',
				eventId: '',
				eventName: '',
				data: '',
			},
			{
				id: '6e2f0f00-e23e-4b89-acea-ca5d2cab55a9',
				eventId: '',
				eventName: '',
				data: '',
			},
		],
	},
};
