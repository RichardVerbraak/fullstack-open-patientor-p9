import React from 'react'
import { Diagnosis } from '../types'

const DiagnosesList = (diagnoses: Diagnosis[]) => {
	// Create an array of diagnose codes by using .find in diagnoses to find the same code and return the found diagnose object
	// Find always returns Type | undefined and because of such the key of the list item will be bugged
	// No clue how to fix
	// const diagnosisCodes = diagnoses?.map((code): Diagnosis | undefined => {
	// 	const sameCodeAsPatient = diagnoses.find((diagnose) => {
	// 		return diagnose.code === code
	// 	})

	// 	return sameCodeAsPatient
	// })

	return <div></div>
}

// {diagnosisCodes?.map((diagnoseObj): React.ReactElement<Diagnosis> => {
// 	return (
// 		<li key={diagnoseObj?.code}>
// 			{diagnoseObj?.code} <span>{diagnoseObj?.name}</span>
// 		</li>
// 	)
// })}

export default DiagnosesList
