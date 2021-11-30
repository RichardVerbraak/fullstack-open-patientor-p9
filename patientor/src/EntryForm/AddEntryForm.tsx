import React, { Fragment } from 'react'
import { Button } from 'semantic-ui-react'
import { Formik, Form, Field } from 'formik'
import { SelectEntryField, TextField } from './EntryFormFields'
import { DiagnosisSelection, NumberField } from '../AddPatientModal/FormField'
import { useStateValue } from '../state'

interface FormProps {
	onSubmit: (formValues: any) => void
}

// Formik wrapping your form can be seen as a context wrapper for your form to use

const AddEntryForm = ({ onSubmit }: FormProps) => {
	const [{ diagnoses }] = useStateValue()

	return (
		<Formik
			initialValues={{
				type: 'HealthCheck',
				date: '',
				description: '',
				specialist: '',
				healthCheckRating: '',
				employerName: '',
				sickLeave: {
					startDate: '',
					endDate: '',
				},
				discharge: {
					date: '',
					criteria: '',
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

				if (values.type === 'HealthCheck' && !values.healthCheckRating) {
					errors.healthCheck = requiredError
				}

				if (values.type === 'Occupational' && !values.employerName) {
					errors.employerName = requiredError
				}

				if (values.type === 'Hospital' && !values.discharge.date) {
					errors.dischargeDate = requiredError
				}

				if (values.type === 'Hospital' && !values.discharge.criteria) {
					errors.dischargeCriteria = requiredError
				}

				return errors
			}}
		>
			{({ values, setFieldValue, setFieldTouched, isValid, dirty }) => {
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

						{values.type === 'HealthCheck' && (
							<Field
								label='Health Rating'
								name='healthCheckRating'
								component={NumberField}
								min={0}
								max={3}
							/>
						)}

						{values.type === 'Occupational' && (
							<Fragment>
								<Field
									label='Employer Name'
									name='employerName'
									placeholder='Employer name'
									component={TextField}
								/>

								<h3>Sick Leave</h3>
								<Field
									label='Start Date'
									name='sickLeave.startDate'
									placeholder='YYYY-MM-DD'
									component={TextField}
								/>
								<Field
									label='End Date'
									name='sickLeave.endDate'
									placeholder='YYYY-MM-DD'
									component={TextField}
								/>
							</Fragment>
						)}

						{values.type === 'Hospital' && (
							<Fragment>
								<h3>Discharge</h3>
								<Field
									label='Date'
									name='discharge.date'
									placeholder='YYYY-MM-DD'
									component={TextField}
								/>
								<Field
									label='Criteria'
									name='discharge.criteria'
									placeholder='criteria'
									component={TextField}
								/>
							</Fragment>
						)}

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

export default AddEntryForm
