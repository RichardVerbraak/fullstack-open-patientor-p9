import React from 'react'
import { HospitalEntry } from '../types'
import { Card } from 'semantic-ui-react'
// import PatientEntry from './PatientEntry'

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
	return (
		<Card>
			<Card.Content>
				<Card.Header>{entry.date}</Card.Header>
				<Card.Meta>{entry.description}</Card.Meta>
			</Card.Content>
		</Card>
	)
}

export default Hospital
