export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export interface Diagnosis {
	code: string
	name: string
	latin?: string
}

export interface BaseEntry {
	id: string
	description: string
	date: string
	specialist: string
	diagnosisCodes?: Array<Diagnosis['code']>
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
	id: string
	name: string
	dateOfBirth: string
	ssn: string
	gender: Gender
	occupation: string
	entries: Entry[]
}

// Could also be used when parsing a new patient in the parsePatient utils function
export type newPatient = Omit<Patient, 'id'>

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>

export type nonSensitivePatient = Omit<Patient, 'ssn'>
