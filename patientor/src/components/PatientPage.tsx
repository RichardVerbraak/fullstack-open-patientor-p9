import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { apiBaseUrl } from '../constants'
import { useStateValue } from '../state'

import { Patient } from '../types'

const PatientPage = () => {
	const { id } = useParams<{ id: string }>()
	const [state, dispatch] = useStateValue()

	console.log(state)

	const fetchPatient = async () => {
		const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)

		dispatch({ type: 'SET_SINGLE_PATIENT', payload: data })
	}

	useEffect(() => {
		// Void because there is no return type
		void fetchPatient()
	}, [])

	return <div></div>
}

export default PatientPage
