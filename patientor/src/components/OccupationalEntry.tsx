import React from 'react'
import { OccupationalHealthCareEntry } from '../types'
import { Card } from 'semantic-ui-react'

const OccupationalEntry: React.FC<{ entry: OccupationalHealthCareEntry }> = ({
	entry,
}) => {
	return (
		<Card>
			<Card.Content>
				<Card.Header>{entry.date}</Card.Header>
				<Card.Meta>{entry.description}</Card.Meta>
			</Card.Content>
		</Card>
	)
}

export default OccupationalEntry
