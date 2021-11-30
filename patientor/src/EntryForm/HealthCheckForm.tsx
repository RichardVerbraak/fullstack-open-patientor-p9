import React from 'react'
import { Button } from 'semantic-ui-react'
import { Formik, Form, Field } from 'formik'
import { SelectEntryField, TextField } from './EntryFormFields'
import { DiagnosisSelection, NumberField } from '../AddPatientModal/FormField'
import { useStateValue } from '../state'
import { HealthCheckEntry, HealthCheckRating } from '../types'

type newHealthCheckEntry = Omit<HealthCheckEntry, 'id'>

interface FormProps {
	onSubmit: (formValues: newHealthCheckEntry) => void
}

// Formik wrapping your form can be seen as a context wrapper for your form to use

const HealthCheckForm = ({ onSubmit }: FormProps) => {
	const [{ diagnoses }] = useStateValue()

	return (
		<Formik
			initialValues={{
				type: 'HealthCheck',
				date: '',
				description: '',
				specialist: '',
				healthCheckRating: HealthCheckRating.LowRisk,
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

				if (!values.healthCheckRating) {
					errors.healthCheck = requiredError
				}

				return errors
			}}
		>
			{({ setFieldValue, setFieldTouched, isValid, dirty }) => {
				return (
					<Form className='form ui'>
						<Field name='type' label='Type' component={SelectEntryField} />

						<Field
							name='date'
							label='Dype'
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
							label='Health Rating'
							name='healthCheckRating'
							component={NumberField}
							min={0}
							max={3}
						/>

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

export default HealthCheckForm
