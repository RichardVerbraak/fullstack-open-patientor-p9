import React from 'react'
import { Entry } from '../types'
import HealthCheckEntry from './HealthCheckEntry'
import Hospital from './HospitalEntry'
import OccupationalEntry from './OccupationalEntry'

const assertNever = (entry: never): never => {
	throw new Error(`Something went wrong ${JSON.stringify(entry)}`)
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
	switch (entry.type) {
		case 'Hospital': {
			return <Hospital entry={entry} />
		}

		case 'HealthCheck': {
			return <HealthCheckEntry entry={entry} />
		}

		case 'OccupationalHealthcare': {
			return <OccupationalEntry entry={entry} />
		}

		default:
			return assertNever(entry)
	}
}

export default EntryDetails
