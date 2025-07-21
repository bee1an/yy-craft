export const createData = (
	deep: number,
	count: number,
	valueField = 'value',
	keyField = 'key',
	prefix = '',
	content: string = '我是内容'
): any[] | undefined => {
	if (deep === 0) {
		return undefined
	}
	return Array(count)
		.fill(0)
		.map((_, i) => ({
			[valueField]: `label-${prefix}${i}: ${content}`,
			[keyField]: `${prefix}${i}`,
			children: createData(deep - 1, count, valueField, keyField, `${prefix}${i}-`)
		}))
}
