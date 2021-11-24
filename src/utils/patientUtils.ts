import { Gender, Patient } from '../types'
import { v1 as uuid } from 'uuid'
import { isString, parseDate, parseString } from './genericUtils'

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
	return Object.values(Gender).includes(gender)
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
