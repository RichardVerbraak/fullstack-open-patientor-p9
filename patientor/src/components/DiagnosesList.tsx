import React from 'react'
import { useStateValue } from '../state'
import { Diagnosis } from '../types'

// Correct way of handling props in React
// Source: https://stackoverflow.com/questions/47805206/reactjs-typescript-cannot-pass-array-of-items-as-property-to-child
const DiagnosesList: React.FC<{ diagnoseCodes: Array<Diagnosis['code']> }> = ({
	diagnoseCodes,
}: {
	diagnoseCodes: Array<Diagnosis['code']>
}) => {
	const [{ diagnoses }] = useStateValue()

	// Create an array of diagnose codes by using .find in diagnoses to find the same code and return the found diagnose object
	const sameCodesAsPatient = diagnoseCodes?.map(
		(code): Diagnosis | undefined => {
			return diagnoses.find((diagnose) => {
				return diagnose.code === code
			})
		}
	)

	return (
		<div>
			{
				<ul>
					{sameCodesAsPatient.map(
						(diagnoseObj, i): React.ReactElement<Diagnosis> => {
							return (
								<li key={i}>
									{diagnoseObj?.code} <span>{diagnoseObj?.name}</span>
								</li>
							)
						}
					)}
				</ul>
			}
		</div>
	)
}

export default DiagnosesList
