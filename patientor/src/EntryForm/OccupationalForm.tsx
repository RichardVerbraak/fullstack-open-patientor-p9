import React, { Fragment } from 'react'
import { Button } from 'semantic-ui-react'
import { Formik, Form, Field } from 'formik'
import { TextField } from './EntryFormFields'
import { DiagnosisSelection } from '../AddPatientModal/FormField'
import { useStateValue } from '../state'
import { OccupationalHealthCareEntry } from '../types'

type newOccupationalEntry = Omit<OccupationalHealthCareEntry, 'id'>

interface FormProps {
	onSubmit: (formValues: newOccupationalEntry) => void
}

// Formik wrapping your form can be seen as a context wrapper for your form to use

const OccupationalForm = ({ onSubmit }: FormProps) => {
	const [{ diagnoses }] = useStateValue()

	return (
		<Formik
			initialValues={{
				type: 'OccupationalHealthcare',
				date: '',
				description: '',
				specialist: '',
				employerName: '',
				sickLeave: {
					startDate: '',
					endDate: '',
				},
			}}
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = 'Field is required'
				const errors: { [field: string]: string } = {}

				if (!values.date) {
					errors.date = requiredError
				}

				if (!values.description) {
					errors.description = requiredError
				}

				if (!values.specialist) {
					errors.specialist = requiredError
				}

				if (!values.employerName) {
					errors.employerName = requiredError
				}

				if (!values.sickLeave?.startDate || !values.sickLeave.endDate) {
					errors.discharge = requiredError
				}

				return errors
			}}
		>
			{({ setFieldValue, setFieldTouched, isValid, dirty }) => {
				return (
					<Form className='form ui'>
						<Field
							name='date'
							label='Date'
							placeholder='YYYY-MM-DD'
							component={TextField}
						/>

						<Field
							name='description'
							label='Description'
							placeholder='Description'
							component={TextField}
						/>

						<Field
							name='specialist'
							label='Specialist'
							placeholder='Specialist'
							component={TextField}
						/>

						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagnoses)}
						/>

						<Field
							name='employerName'
							label='Employer Name'
							placeholder='Employer Name'
							component={TextField}
						/>

						<Fragment>
							<h3>Sick Leave</h3>
							<Field
								name='sickLeave.startDate'
								label='Start Date'
								placeholder='YYYY-MM-DD'
								component={TextField}
							/>
							<Field
								name='sickLeave.endDate'
								label='End Date'
								placeholder='YYYY-MM-DD'
								component={TextField}
							/>
						</Fragment>

						<div>
							<Button type='submit' disabled={!isValid || !dirty}>
								Add entry
							</Button>
						</div>
					</Form>
				)
			}}
		</Formik>
	)
}

export default OccupationalForm
