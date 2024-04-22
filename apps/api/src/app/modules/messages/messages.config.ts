import { messagesSwaggerConfig } from './infrastructure/swagger/messages-swagger.config';

export const messagesConfig = {
	entity: { name: 'message' },
	globalRoute: 'messages',
	swagger: messagesSwaggerConfig,
	repository: {
		repositoryInterface: 'MessageRepository',
	},
	getController: {
		constants: {
			context: 'MessageGetController',
		},
		logs: {
			findByCriteria: {
				requestLog: 'Request received to find messages by criteria',
			},
		},
	},
	creator: {
		constants: {
			context: 'MessageCreator',
		},
	},
	finderByCriteria: {
		constants: {
			context: 'MessagesFinderByCriteria',
		},
	},
};
