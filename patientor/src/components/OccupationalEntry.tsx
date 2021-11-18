import React from 'react'
import { Diagnosis, OccupationalHealthCareEntry } from '../types'
import { Card, Icon } from 'semantic-ui-react'
import { useStateValue } from '../state'

const OccupationalEntry: React.FC<{ entry: OccupationalHealthCareEntry }> = ({
	entry,
}) => {
	const [{ diagnoses }] = useStateValue()

	return (
		<Card>
			<Card.Content>
				<Card.Header>
					{entry.date} <Icon name='cog' />
				</Card.Header>
				<Card.Meta>{entry.description}</Card.Meta>
				{entry.diagnosisCodes && (
					<ul>
						{entry.diagnosisCodes
							?.map((code): Diagnosis | undefined => {
								const sameCodeAsPatient = diagnoses.find((diagnose) => {
									return diagnose.code === code
								})

								return sameCodeAsPatient
							})
							.map((diagnoseObj): React.ReactElement<Diagnosis> => {
								return (
									<li key={diagnoseObj?.code}>
										{diagnoseObj?.code} <span>{diagnoseObj?.name}</span>
									</li>
								)
							})}
					</ul>
				)}
			</Card.Content>
		</Card>
	)
}

export default OccupationalEntry
