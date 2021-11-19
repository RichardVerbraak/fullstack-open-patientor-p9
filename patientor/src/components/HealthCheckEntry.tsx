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
				{entry.healthCheckRating === 0 ? (
					<Icon name='heart' color='green' />
				) : entry.healthCheckRating === 1 || entry.healthCheckRating === 2 ? (
					<Icon name='heart' color='yellow' />
				) : (
					<Icon name='heart' color='red' />
				)}
			</Card.Content>
		</Card>
	)
}

export default HealthCheck
