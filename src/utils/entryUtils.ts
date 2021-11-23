import { v1 as uuid } from 'uuid'
import {
	Entry,
	HealthCheckEntry,
	HealthCheckRating,
	HospitalEntry,
	newEntry,
	OccupationalHealthCareEntry,
} from '../types'

// Get entry object
// Check the type of the entry ( Occupational | HealthCheck | Hospital )
// Check if the object has the required fields for the corresponding entry

// interface BaseEntryFields {
// 	description: unknown
// 	date: unknown
// 	specialist: unknown
// 	diagnosisCodes?: unknown
// }

// interface HealthCheckFields extends BaseEntryFields {
// 	type: 'HealthCheck'
// 	healthCheckRating: unknown
// }

// interface OccupationalFields extends BaseEntryFields {
// 	type: 'OccupationalHealthcare'
// 	employerName: unknown
// 	sickLeave?: {
// 		startDate: unknown
// 		endDate: unknown
// 	}
// }

// interface HospitalFields extends BaseEntryFields {
// 	type: 'Hospital'
// 	discharge: {
// 		date: unknown
// 		criteria: unknown
// 	}
// }

// type EntryFields = HealthCheckFields | OccupationalFields | HospitalFields

const parseNewEntry = (entry: newEntry): Entry => {
	const { type } = entry

	// TODO: Check if there is a type
	switch (type) {
		case 'HealthCheck': {
			const parsedEntry = {
				id: uuid(),
				type: 'HealthCheck',
				date: parseDate(entry.date),
				specialist: parseString(entry.specialist),
				description: parseString(entry.description),
				healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
			}

			return parsedEntry as HealthCheckEntry
		}

		case 'Hospital': {
			return entry as HospitalEntry
		}

		case 'OccupationalHealthcare': {
			return entry as OccupationalHealthCareEntry
		}

		default: {
			return type
		}
	}
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
