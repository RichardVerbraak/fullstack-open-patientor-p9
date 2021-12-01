import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router'
import { apiBaseUrl } from '../constants'
import { setSinglePatient, useStateValue } from '../state'

import { NewEntry, Patient } from '../types'
import { Icon } from 'semantic-ui-react'
import EntryDetails from './EntryDetails'
import HealthCheckForm from '../EntryForm/HealthCheckForm'
import HospitalForm from '../EntryForm/HospitalForm'
import OccupationalForm from '../EntryForm/OccupationalForm'

// Entry is passed in as a destructured object as prop instead of 'entry={etry}'
// This is because of the 'entry is not assignable to IntrinsicAttributes warning'
// https://stackoverflow.com/questions/59969756/not-assignable-to-type-intrinsicattributes-intrinsicclassattributes-react-js
// Short answer is because TS expects the entry to exist and not be undefined or null, destructuring it says 'this exists' to TS

// Checking for patient.entries and the for patient.entries.length in order to render 'No entries' when the patient entries array is empty
const PatientPage = () => {
	// Tell the param is an object with an id of string
	const { id } = useParams<{ id: string }>()
	const [{ patient }, dispatch] = useStateValue()
	const [type, setType] = useState('HealthCheck')

	const fetchPatient = async () => {
		const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)

		dispatch(setSinglePatient(data))
	}

	// Change form values type
	const submitNewEntry = async (formValues: any) => {
		try {
			console.log(formValues)

			// Destructure
			const { data } = await axios.post<NewEntry>(
				`${apiBaseUrl}/patients/${id}/entries`,
				formValues
			)

			console.log(data)

			// dispatch the data to the state to render the new entry on the patient
		} catch (error) {
			// Pass error down to the form later on?
			console.log(error)
		}
	}

	useEffect(() => {
		// Only fetch when URL param (id) doesn't match that of the patient
		if (id !== patient.id) {
			// Void because there is no return type
			void fetchPatient()
		}
	}, [])

	return (
		<div>
			<h1>
				{patient.name}{' '}
				<span>
					<Icon
						name={
							patient.gender === 'female'
								? 'venus'
								: patient.gender === 'male'
								? 'mars'
								: 'genderless'
						}
					/>
				</span>
			</h1>

			<p>ssn: {patient.ssn}</p>
			<p>occupation: {patient.occupation}</p>
			<div>
				<h3>Entries</h3>
				{patient && patient.entries && patient.entries.length ? (
					patient.entries.map((entry) => {
						return <EntryDetails key={entry.id} entry={entry} />
					})
				) : (
					<div>No entries</div>
				)}
				<div>
					<h2>Create new entry</h2>

					<label htmlFor='entryTypes'>Entry Type: </label>

					<select
						name='entryTypes'
						id='entryTypes'
						onChange={(e) => {
							setType(e.target.value)
						}}
					>
						<option value='HealthCheck'>HealthCheck</option>
						<option value='Hospital'>Hospital</option>
						<option value='Occupational'>Occupational</option>
					</select>

					{type === 'HealthCheck' && (
						<HealthCheckForm onSubmit={submitNewEntry} />
					)}
					{type === 'Hospital' && <HospitalForm onSubmit={submitNewEntry} />}
					{type === 'Occupational' && (
						<OccupationalForm onSubmit={submitNewEntry} />
					)}
				</div>
			</div>
		</div>
	)
}

export default PatientPage
