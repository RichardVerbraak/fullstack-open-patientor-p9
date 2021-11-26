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

export type OmitFromUnion<
	T,
	K extends string | number | symbol
> = T extends unknown ? Omit<T, K> : never

export type NewEntry = OmitFromUnion<Entry, 'id'>

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
