import React from 'react'
// import { useStateValue } from '../state'
import { Entry } from '../types'

const PatientEntry = (entry: Entry) => {
	// const [{ diagnoses }] = useStateValue()

	return (
		<div>
			<p>
				{entry.date} <span>{entry.description}</span>
			</p>
			<ul>
				{entry.diagnosisCodes?.map((code) => {
					return <li key={code}>{code}</li>
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
