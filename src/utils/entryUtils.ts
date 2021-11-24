import { v1 as uuid } from 'uuid'
import {
	Entry,
	HealthCheckEntry,
	HealthCheckRating,
	HospitalEntry,
	OccupationalHealthCareEntry,
} from '../types'
import { isDate, isString, parseDate } from './genericUtils'

type BaseEntryFields = {
	description: unknown
	date: unknown
	specialist: unknown
	diagnosisCodes?: any
}

interface HealthCheckFields extends BaseEntryFields {
	type: 'HealthCheck'
	healthCheckRating: unknown
}

interface HospitalFields extends BaseEntryFields {
	type: 'Hospital'
	discharge: {
		date: unknown
		criteria: unknown
	}
}

interface OccupationalHealthCareFields extends BaseEntryFields {
	type: 'OccupationalHealthcare'
	employerName: unknown
	sickLeave?: {
		startDate: unknown
		endDate: unknown
	}
}

type EntryFields =
	| HealthCheckFields
	| HospitalFields
	| OccupationalHealthCareFields

// These two are being used to make sure the fields of the object are present and the right format
interface Discharge {
	date: string
	criteria: string
}

interface sickLeave {
	startDate: string
	endDate: string
}

// Used for checking if the entry.type that is coming in via the req.body is included in this Enum
enum EntryTypes {
	HealthCheck = 'HealthCheck',
	Hospital = 'Hospital',
	Occupational = 'OccupationalHealthcare',
}

const assertNever = (value: never): never => {
	throw new Error(`Wrong value ${JSON.stringify(value)}`)
}

// HealthCheck
const parseHealthCheckEntry = (entry: HealthCheckFields): HealthCheckEntry => {
	const {
		type,
		date,
		specialist,
		description,
		healthCheckRating,
		diagnosisCodes,
	} = entry

	const parsedEntry = {
		id: uuid(),
		type,
		date: parseDate(date),
		specialist: parseSpecialist(specialist),
		description: parseDescription(description),
		healthCheckRating: parseHealthCheckRating(healthCheckRating),
		diagnosisCodes: diagnosisCodes
			? parseDiagnosisCodes(diagnosisCodes)
			: diagnosisCodes,
	}

	return parsedEntry
}

// Hospital
const parseHospitalEntry = (entry: HospitalFields): HospitalEntry => {
	const { type, date, specialist, description, discharge, diagnosisCodes } =
		entry

	const parsedEntry = {
		id: uuid(),
		type: type,
		date: parseDate(date),
		specialist: parseSpecialist(specialist),
		description: parseDescription(description),
		discharge: parseDischarge(discharge),
		diagnosisCodes: diagnosisCodes
			? parseDiagnosisCodes(diagnosisCodes)
			: diagnosisCodes,
	}

	return parsedEntry
}

// Occupational
const parseOccupationalEntry = (
	entry: OccupationalHealthCareFields
): OccupationalHealthCareEntry => {
	const {
		type,
		date,
		specialist,
		description,
		employerName,
		sickLeave,
		diagnosisCodes,
	} = entry

	const parsedEntry = {
		id: uuid(),
		type: type,
		date: parseDate(date),
		specialist: parseSpecialist(specialist),
		description: parseDescription(description),
		employerName: parseEmployerName(employerName),
		sickLeave: sickLeave ? parseSickLeave(sickLeave) : sickLeave,
		diagnosisCodes: diagnosisCodes
			? parseDiagnosisCodes(diagnosisCodes)
			: diagnosisCodes,
	}

	return parsedEntry
}

const parseEmployerName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error(`Missing employer name or is not a string -- ${name}`)
	}

	return name
}

const parseDescription = (description: unknown): string => {
	if (!description || !isString(description)) {
		throw new Error(`Missing description or is not a string -- ${description}`)
	}

	return description
}

const parseSpecialist = (specialist: unknown): string => {
	if (!specialist || !isString(specialist)) {
		throw new Error(`Missing specialist or is not a string -- ${specialist}`)
	}

	return specialist
}

// Checks if the type is correct => pass the parsing to the right function based on type => return parsedEntry
const parseNewEntry = (entry: EntryFields): Entry => {
	const { type } = entry

	// Check for type
	parseType(type)

	switch (type) {
		case 'HealthCheck': {
			return parseHealthCheckEntry(entry)
		}

		case 'Hospital': {
			return parseHospitalEntry(entry)
		}

		case 'OccupationalHealthcare': {
			return parseOccupationalEntry(entry)
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
	if (!type || !isString(type) || !isType(type)) {
		throw new Error(`Missing type or invalid data -- ${type}`)
	}

	return type
}

const isDiagnosisCodes = (codes: any) => {
	return (
		Array.isArray(codes) &&
		codes.every((code) => {
			return typeof code === 'string'
		})
	)
}

const parseDiagnosisCodes = (codes: unknown) => {
	console.log(codes)
	if (!codes || !isDiagnosisCodes(codes)) {
		throw new Error(`No codes`)
	}

	return codes
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
	return (
		isString(discharge.date) &&
		isDate(discharge.date) &&
		isString(discharge.criteria)
	)
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
