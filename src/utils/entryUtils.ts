import { v1 as uuid } from 'uuid'
import { HospitalEntry } from '../../patientor/src/types'
import { Entry, HealthCheckEntry, HealthCheckRating, newEntry } from '../types'

// Get entry object
// Check the type of the entry ( Occupational | HealthCheck | Hospital )
// Check if the object has the required fields for the corresponding entry

// Enum to check if the entry.type matches any of these values in parseType
enum EntryTypes {
	HealthCheck = 'HealthCheck',
	Hospital = 'Hospital',
	OccupationalHealthcare = 'OccupationalHealthcare',
}

const assertNever = (value: never): never => {
	throw new Error(`Wrong value ${JSON.stringify(value)}`)
}

const parseNewEntry = (entry: newEntry): Entry => {
	const { type } = entry

	// TODO: Check if there is a type
	switch (type) {
		case 'HealthCheck': {
			const parsedEntry = {
				id: uuid(),
				type: parseType(entry.type),
				date: parseDate(entry.date),
				specialist: parseString(entry.specialist),
				description: parseString(entry.description),
				healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
			}

			return parsedEntry as HealthCheckEntry
		}

		case 'Hospital': {
			const parsedEntry = {
				id: uuid(),
				type: parseType(entry.type),
				date: parseDate(entry.date),
				specialist: parseString(entry.specialist),
				description: parseString(entry.description),
				discharge: entry.discharge,
			}

			return parsedEntry as HospitalEntry
		}

		case 'OccupationalHealthcare': {
			const parsedEntry = {
				id: uuid(),
				type: entry.type,
				date: parseDate(entry.date),
				specialist: parseString(entry.specialist),
				description: parseString(entry.description),
				employerName: entry.employerName,
				sickLeave: entry.sickLeave,
			}

			return parsedEntry
		}

		default: {
			return assertNever(entry)
		}
	}
}

const isType = (type: any): type is EntryTypes => {
	return Object.values(EntryTypes).includes(type)
}

const parseType = (type: unknown) => {
	if (!type || !isString(type) || isType(type)) {
		throw new Error(`Missing name or invalid data -- ${type}`)
	}

	return type
}

const isString = (data: unknown): data is string => {
	return typeof data === 'string' || data instanceof String
}

const parseString = (data: unknown) => {
	if (!data || !isString(data)) {
		throw new Error('Not a string')
	}

	return data
}

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date))
}

const parseDate = (date: unknown) => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error(`Not the correct date type ${date}`)
	}

	return date
}

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
	return Object.values(HealthCheckRating).includes(rating)
}

const parseHealthCheckRating = (healthCheckRating: unknown) => {
	if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
		throw new Error('No rating')
	}

	return healthCheckRating
}

export { parseNewEntry }
