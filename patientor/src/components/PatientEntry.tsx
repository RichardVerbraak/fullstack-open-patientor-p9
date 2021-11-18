import axios from 'axios'
import React, { useEffect } from 'react'
import { apiBaseUrl } from '../constants'
import { setDiagnoses, useStateValue } from '../state'
import { Diagnosis, Entry } from '../types'
import { Card } from 'semantic-ui-react'

const PatientEntry = (entry: Entry) => {
	const [, dispatch] = useStateValue()

	const fetchDiagnoses = async () => {
		const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)

		dispatch(setDiagnoses(data))
	}

	useEffect(() => {
		void fetchDiagnoses()
	}, [])

	// Create an array of diagnose codes by using .find in diagnoses to find the same code and return the found diagnose object
	// Find always returns Type | undefined and because of such the key of the list item will be bugged
	// No clue how to fix
	// const diagnosisCodes = entry.diagnosisCodes?.map(
	// 	(code): Diagnosis | undefined => {
	// 		const sameCodeAsPatient = diagnoses.find((diagnose) => {
	// 			return diagnose.code === code
	// 		})

	// 		return sameCodeAsPatient
	// 	}
	// )

	return (
		<Card>
			<Card.Content>
				<Card.Header>{entry.date}</Card.Header>
				<Card.Meta>{entry.description}</Card.Meta>
			</Card.Content>
		</Card>
	)
}

// {diagnosisCodes && (
// 	<Card.Group>
// 		{diagnosisCodes?.map((diagnoseObj): React.ReactElement<Diagnosis> => {
// 			return (
// 				<Card key={diagnoseObj?.code}>
// 					{diagnoseObj?.code} <span>{diagnoseObj?.name}</span>
// 				</Card>
// 			)
// 		})}
// 	</Card.Group>
// )}

export default PatientEntry
