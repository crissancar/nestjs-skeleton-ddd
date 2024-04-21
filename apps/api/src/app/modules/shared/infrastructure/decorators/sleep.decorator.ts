export function Sleep(ms: number) {
	return function (
		target: unknown,
		propertyKey: string,
		descriptor: PropertyDescriptor,
	): PropertyDescriptor {
		const originalMethod = descriptor.value;

		descriptor.value = async function (...args: unknown[]): Promise<unknown> {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(originalMethod.apply(this, args));
				}, ms);
			});
		};

		return descriptor;
	};
}
