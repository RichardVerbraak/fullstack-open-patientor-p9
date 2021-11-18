import React from 'react'
import { HospitalEntry } from '../types'
import { Card, Icon } from 'semantic-ui-react'

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
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

export default Hospital
