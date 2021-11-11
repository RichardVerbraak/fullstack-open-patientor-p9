import axios from 'axios'
import React, { useEffect } from 'react'
import { apiBaseUrl } from '../constants'
import { useStateValue } from '../state'

const PatientPage = ({ match }: { match: any }) => {
	const { id } = match.params.id
	const [state, dispatch] = useStateValue()

	// Fetch data from the reducer state and display below
	// const { data } = useStateValue()

	useEffect(() => {
		const patients = axios.get(`${apiBaseUrl}/patients/${id}`)

		// dispatch action to reducer
	})

	return <div></div>
}

export default PatientPage
