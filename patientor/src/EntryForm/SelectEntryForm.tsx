import axios from 'axios'
import React, { useState } from 'react'
import { apiBaseUrl } from '../constants'
import HealthCheckForm from '../EntryForm/HealthCheckForm'
import HospitalForm from '../EntryForm/HospitalForm'
import OccupationalForm from '../EntryForm/OccupationalForm'
import { NewEntry } from '../types'

const SelectEntryForm = ({ id }: { id: string }) => {
	const [type, setType] = useState('HealthCheck')

	// Change form values type
	const submitNewEntry = async (formValues: NewEntry) => {
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
