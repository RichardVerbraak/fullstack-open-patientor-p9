import React from 'react'
import { OccupationalHealthCareEntry } from '../types'
import { Card, Icon } from 'semantic-ui-react'
import DiagnosesList from './DiagnosesList'

const OccupationalEntry: React.FC<{ entry: OccupationalHealthCareEntry }> = ({
	entry,
}) => {
	return (
		<Card>
			<Card.Content>
				<Card.Header>
					{entry.date} <Icon name='cog' />
				</Card.Header>
				<Card.Meta>{entry.description}</Card.Meta>
				{entry.diagnosisCodes && (
					<DiagnosesList diagnoseCodes={entry.diagnosisCodes} />
				)}
			</Card.Content>
		</Card>
	)
}

export default OccupationalEntry
