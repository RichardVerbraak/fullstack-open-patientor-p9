import React, { Fragment } from 'react'
import { Button } from 'semantic-ui-react'
import { Formik, Form, Field } from 'formik'
import { SelectEntryField, TextField } from './EntryFormFields'
import { DiagnosisSelection, NumberField } from '../AddPatientModal/FormField'
import { useStateValue } from '../state'
// import { HealthCheckEntry } from '../types'
// import { TextField } from '../AddPatientModal/FormField'

// type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>

// interface FormProps {
// 	onSubmit: (formValues: NewHealthCheckEntry) => void
// }

// Formik wrapping your form can be seen as a context wrapper for your form to use

const AddEntryForm = () => {
	const [{ diagnoses }] = useStateValue()

	return (
		<Formik
			initialValues={{
				type: 'HealthCheck',
				description: '',
				date: '',
				specialist: '',
				healthCheckRating: '',
				employerName: '',
				sickLeave: {
					startDate: '',
					endDate: '',
				},
			}}
			onSubmit={(data) => {
				console.log(data)
			}}
		>
			{({ values, setFieldValue, setFieldTouched }) => {
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

						<div>
							<Button type='submit'>Add entry</Button>
						</div>
					</Form>
				)
			}}
		</Formik>
	)
}

export default AddEntryForm
