import axios from 'axios'
import React, { useEffect } from 'react'

import { useParams } from 'react-router'
import { apiBaseUrl } from '../constants'
import { setSinglePatient, useStateValue } from '../state'

import { Patient } from '../types'
import { Icon } from 'semantic-ui-react'

const PatientPage = () => {
	// Tell the param is an object with an id of string
	const { id } = useParams<{ id: string }>()
	const [{ patient }, dispatch] = useStateValue()

	const fetchPatient = async () => {
		const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)

		dispatch(setSinglePatient(data))
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
		</div>
	)
}

export default PatientPage
