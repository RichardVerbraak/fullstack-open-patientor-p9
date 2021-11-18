import axios from 'axios'
import React, { useEffect } from 'react'
import { apiBaseUrl } from '../constants'
import { setDiagnoses, useStateValue } from '../state'
import { Diagnosis, Entry } from '../types'
import HealthCheckEntry from './HealthCheckEntry'
import Hospital from './HospitalEntry'
import OccupationalEntry from './OccupationalEntry'

const assertNever = (entry: never): never => {
	throw new Error(`Something went wrong ${JSON.stringify(entry)}`)
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
	const [, dispatch] = useStateValue()

	const fetchDiagnoses = async () => {
		const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)

		dispatch(setDiagnoses(data))
	}

	useEffect(() => {
		void fetchDiagnoses()
	}, [])

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
