export const rabbitmqConfig = {
	uri: 'amqps://gtpxvtbs:SI4GqOE8sm7Zryv9b5xqlTcBqBXdd-92@rat.rmq2.cloudamqp.com/gtpxvtbs',
	users: {
		exchange: 'users_exchange',
		queue: 'users_queue',
		routingKey: {
			create: 'user.create',
		},
	},
};
