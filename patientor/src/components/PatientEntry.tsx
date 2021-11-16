import React from 'react'
import { Entry } from '../types'

const PatientEntry = (entry: Entry) => {
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

export default PatientEntry
