import React from 'react'
import { HealthCheckEntry } from '../types'
import { Card, Icon } from 'semantic-ui-react'

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
	return (
		<Card>
			<Card.Content>
				<Card.Header>
					{entry.date}
					<Icon name='doctor' />
				</Card.Header>
				<Card.Meta>{entry.description}</Card.Meta>
			</Card.Content>
		</Card>
	)
}

export default HealthCheck
