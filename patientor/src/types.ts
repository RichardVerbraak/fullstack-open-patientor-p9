export interface Diagnosis {
	code: string
	name: string
	latin?: string
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export interface BaseEntry {
	id: string
	description: string
	date: string
	specialist: string
	diagnosisCodes?: Array<Diagnosis['code']>
}

// Using an enum since the rating ranges from 0 to 3
export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

export interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck'
	healthCheckRating: HealthCheckRating
}

export interface OccupationalHealthCareEntry extends BaseEntry {
	type: 'OccupationalHealthcare'
	employerName: string
	sickLeave?: {
		startDate: string
		endDate: string
	}
}

export interface HospitalEntry extends BaseEntry {
	type: 'Hospital'
	discharge: {
		date: string
		criteria: string
	}
}

// https://stackoverflow.com/questions/51651499/typescript-what-is-a-naked-type-parameter
// Define special omit for unions

// This takes in a Type (T)
// Where the keys of said Type (K) are of subtype string, number and symbol since Objects can only have keys of type string number and symbol
// The condition is: if the Type is assignable to unknown which always results in true
// Then it would Omit every said key (K) from every Type (Entry being a union type in this example)
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never

// Define Entry without the 'id' property
type EntryWithoutId = UnionOmit<Entry, 'id'>

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry =
	| HealthCheckEntry
	| OccupationalHealthCareEntry
	| HospitalEntry

export interface Patient {
	id: string
	name: string
	occupation: string
	gender: Gender
	ssn?: string
	dateOfBirth?: string
	entries: Entry[]
}
