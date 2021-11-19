import React from 'react'
import { HealthCheckEntry } from '../types'
import { Card, Icon } from 'semantic-ui-react'
import DiagnosesList from './DiagnosesList'

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
	return (
		<Card>
			<Card.Content>
				<Card.Header>
					{entry.date}
					<Icon name='doctor' />
				</Card.Header>
				<Card.Meta>{entry.description}</Card.Meta>
				{entry.diagnosisCodes && (
					<DiagnosesList diagnoseCodes={entry.diagnosisCodes} />
				)}
			</Card.Content>
		</Card>
	)
}

export default HealthCheck
