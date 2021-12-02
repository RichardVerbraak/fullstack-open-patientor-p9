import axios from 'axios'
import React, { useState } from 'react'
import { apiBaseUrl } from '../constants'
import HealthCheckForm from '../EntryForm/HealthCheckForm'
import HospitalForm from '../EntryForm/HospitalForm'
import OccupationalForm from '../EntryForm/OccupationalForm'
import { setSinglePatient, useStateValue } from '../state'
import { NewEntry, Patient } from '../types'

const SelectEntryForm = ({ id }: { id: string }) => {
	const [type, setType] = useState('HealthCheck')
	const [, dispatch] = useStateValue()

	const submitNewEntry = async (formValues: NewEntry) => {
		try {
			// Post the new entry and return the patient with the updated entries
			const { data } = await axios.post<Patient>(
				`${apiBaseUrl}/patients/${id}/entries`,
				formValues
			)

			// Update the patient in state (triggers re-render)
			dispatch(setSinglePatient(data))
		} catch (error) {
			// Pass error down to the form later on?
			console.log(error)
		}
	}

	return (
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

			{type === 'HealthCheck' && <HealthCheckForm onSubmit={submitNewEntry} />}
			{type === 'Hospital' && <HospitalForm onSubmit={submitNewEntry} />}
			{type === 'Occupational' && (
				<OccupationalForm onSubmit={submitNewEntry} />
			)}
		</div>
	)
}

export default SelectEntryForm
