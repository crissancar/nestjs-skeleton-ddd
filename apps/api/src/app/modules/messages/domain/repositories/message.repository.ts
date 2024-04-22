import { CriteriaResult } from '../../../shared/domain/interfaces/criteria-result.interface';
import { FindMessagesByCriteriaRequest } from '../../application/dtos/find-messages-by-criteria-request.dto';
import { Message } from '../models/message.model';

export interface MessageRepository {
	create(message: Message): Promise<Message>;
	findByCriteria(request: FindMessagesByCriteriaRequest): Promise<CriteriaResult<Message>>;
}
