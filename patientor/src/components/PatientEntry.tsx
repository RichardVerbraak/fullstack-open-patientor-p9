import axios from 'axios'
import React, { useEffect } from 'react'
import { apiBaseUrl } from '../constants'
import { setDiagnoses, useStateValue } from '../state'
import { Diagnosis, Entry } from '../types'

const PatientEntry = (entry: Entry) => {
	const [{ diagnoses }, dispatch] = useStateValue()

	const fetchDiagnoses = async () => {
		const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)

		dispatch(setDiagnoses(data))
	}

	useEffect(() => {
		void fetchDiagnoses()
	}, [])

	return (
		<div>
			<p>
				{entry.date} <span>{entry.description}</span>
			</p>
			<ul>
				{entry.diagnosisCodes?.map((code) => {
					return diagnoses
						.filter((diagnose) => {
							return code === diagnose.code
						})
						.map((entry) => {
							return (
								<li key={entry.code}>
									{entry.code} <span>{entry.name}</span>
								</li>
							)
						})
				})}
			</ul>
		</div>
	)
}
// {entry.diagnosisCodes?.map((code) => {
// 					console.log(
// 						diagnoses.filter((diagnose) => {
// 							return diagnose.code === code
// 						})
// 					)
// 				})}

export default PatientEntry
