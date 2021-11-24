const isString = (data: unknown): data is string => {
	return typeof data === 'string' || data instanceof String
}

const parseString = (data: unknown): string => {
	if (!data || !isString(data)) {
		throw new Error(`Missing or not a string value -- ${data}`)
	}

	return data
}

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error(`Missing or not a valid date -- ${date}`)
	}

	return date
}

export { isString, parseString, isDate, parseDate }
