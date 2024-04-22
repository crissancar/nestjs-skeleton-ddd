import { sharedHeadersSwagger } from '../../../shared/config/swagger/shared-headers.swagger';
import { sharedResponsesSwagger } from '../../../shared/config/swagger/shared-responses.swagger';
import { FindMessagesByCriteriaResponse } from '../../application/dtos/find-messages-by-criteria-response.dto';

const { ok, badRequest } = sharedResponsesSwagger;
const { findByCriteria, global } = sharedHeadersSwagger;

export const messagesSwaggerConfig = {
	tag: 'Messages',
	findByCriteria: {
		operation: {
			summary: 'Find messages by criteria',
		},
		query: {
			eventName: {
				name: 'eventName',
				description: 'Message eventName',
				example: 'user.created',
				required: false,
				type: String,
			},
		},
		response: {
			ok: {
				...ok,
				type: FindMessagesByCriteriaResponse,
				headers: {
					...global,
					...findByCriteria,
				},
			},
			badRequest: {
				...badRequest,
			},
		},
	},
};
