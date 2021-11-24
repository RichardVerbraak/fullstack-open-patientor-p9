import { v1 as uuid } from 'uuid'
import { Entry, HealthCheckRating, newEntry } from '../types'
import { isDate, isString, parseDate, parseString } from './genericUtils'

// Get entry object
// Check the type of the entry ( Occupational | HealthCheck | Hospital )
// Check if the object has the required fields for the corresponding entry

// Enum to check if the entry.type matches any of these values in parseType
// enum EntryTypes {
// 	HealthCheck = 'HealthCheck',
// 	Hospital = 'Hospital',
// 	OccupationalHealthcare = 'OccupationalHealthcare',
// }

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
				type,
				date: parseDate(entry.date),
				specialist: parseString(entry.specialist),
				description: parseString(entry.description),
				healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
			}

			return parsedEntry
		}

		case 'Hospital': {
			const parsedEntry = {
				id: uuid(),
				type,
				date: parseDate(entry.date),
				specialist: parseString(entry.specialist),
				description: parseString(entry.description),
				discharge: parseDischarge(entry.discharge),
			}

			return parsedEntry
		}

		case 'OccupationalHealthcare': {
			const parsedEntry = {
				id: uuid(),
				type,
				date: parseDate(entry.date),
				specialist: parseString(entry.specialist),
				description: parseString(entry.description),
				employerName: parseString(entry.employerName),
				sickLeave: parseSickLeave(entry.sickLeave),
			}

			return parsedEntry
		}

		default: {
			return assertNever(entry)
		}
	}
}

// const isType = (type: any): type is EntryTypes => {
// 	return Object.values(EntryTypes).includes(type)
// }

// const parseType = (type: unknown) => {
// 	if (!type || !isString(type) || !isType(type)) {
// 		throw new Error(`Missing type or invalid data -- ${type}`)
// 	}

// 	return type
// }

interface Discharge {
	date: string
	criteria: string
}

interface sickLeave {
	startDate: string
	endDate: string
}

const isSickLeave = (sickLeave: any): sickLeave is sickLeave => {
	return isString(sickLeave.startDate) && isString(sickLeave.endDate)
}

const parseSickLeave = (sickLeave: unknown) => {
	if (!sickLeave || !isSickLeave(sickLeave)) {
		throw new Error(
			`Missing or one of the values is malformed -- ${JSON.stringify(
				sickLeave
			)}`
		)
	}

	return sickLeave
}

const isDischarge = (discharge: any): discharge is Discharge => {
	return isDate(discharge.date) && isString(discharge.criteria)
}

const parseDischarge = (dischargeObject: unknown): Discharge => {
	if (!dischargeObject || !isDischarge(dischargeObject)) {
		throw new Error(
			`Missing or one of the values is malformed -- ${JSON.stringify(
				dischargeObject
			)}`
		)
	}

	return dischargeObject
}

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
	return Object.values(HealthCheckRating).includes(rating)
}

const parseHealthCheckRating = (
	healthCheckRating: unknown
): HealthCheckRating => {
	if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
		throw new Error(`Missing or not the correct rating -- ${healthCheckRating}`)
	}

	return healthCheckRating
}

export { parseNewEntry }
