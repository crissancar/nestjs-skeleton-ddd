import { Message } from '../models/message.model';

export interface MessageRepository {
	create(message: Message): Promise<Message>;
}
