import React from 'react'
import { HealthCheckEntry } from '../types'
import { Card } from 'semantic-ui-react'

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
	return (
		<Card>
			<Card.Content>
				<Card.Header>{entry.date}</Card.Header>
				<Card.Meta>{entry.description}</Card.Meta>
			</Card.Content>
		</Card>
	)
}

export default HealthCheck
