const sensitiveKeys = ['password'];

export class SensitiveDataMasker {
	static mask<T>(data: T): T {
		const maskedData = structuredClone(data);

		for (const key of Object.keys(maskedData)) {
			if (sensitiveKeys.includes(key)) {
				maskedData[key] = '*';
			}
		}

		return maskedData;
	}
}
