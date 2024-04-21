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
			routes: { find: ':id' },
			params: { id: 'id' },
		},
		logs: {
			find: {
				requestLog: 'Request received to find an message',
			},
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
