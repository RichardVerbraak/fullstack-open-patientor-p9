import { Gender, Patient } from '../types'
import { v1 as uuid } from 'uuid'

// Will throw up error about unsafe-argument because Req.body aka Req being of any type
// This was not explained in the course...
type PatientFields = {
	name: unknown
	dateOfBirth: unknown
	ssn: unknown
	gender: unknown
	occupation: unknown
	id: string
}

// Destructures the unknown types from PatientFields type
const parseNewPatient = ({
	name,
	dateOfBirth,
	ssn,
	gender,
	occupation,
	id,
}: PatientFields): Patient => {
	// Add random ID if there is none (this is done because we also parse all of the hardcoded data with this function)
	const parsedPatient = {
		id: id ? id : uuid(),
		name: parseString(name),
		dateOfBirth: parseDate(dateOfBirth),
		ssn: parseSSN(ssn),
		gender: parseGender(gender),
		occupation: parseOccupation(occupation),
		entries: [],
	}

	return parsedPatient
}

const isString = (name: unknown): name is string => {
	return typeof name === 'string' || name instanceof String
}

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
	return Object.values(Gender).includes(gender)
}

const parseString = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error(`Missing name or invalid data -- ${name}`)
	}

	return name
}

// isString operation runs first so that's why isDate can take the date in as string since it comes AFTER parsing for a string
const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error(`Missing date or invalid data -- ${date}`)
	}

	return date
}

const parseSSN = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error(`Missing ssn or invalid data -- ${ssn}`)
	}

	return ssn
}

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error(`Missing gender or invalid data -- ${gender}`)
	}

	return gender
}

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error(`Missing occupation or invalid data -- ${occupation}`)
	}

	return occupation
}

export { parseNewPatient }
