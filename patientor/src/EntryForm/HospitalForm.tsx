import React, { Fragment } from 'react'
import { Button } from 'semantic-ui-react'
import { Formik, Form, Field } from 'formik'
import { TextField } from './EntryFormFields'
import { DiagnosisSelection } from '../AddPatientModal/FormField'
import { useStateValue } from '../state'
import { HospitalEntry } from '../types'

type newHospitalEntry = Omit<HospitalEntry, 'id'>

interface FormProps {
	onSubmit: (formValues: newHospitalEntry) => void
}

// Formik wrapping your form can be seen as a context wrapper for your form to use

const HospitalForm = ({ onSubmit }: FormProps) => {
	const [{ diagnoses }] = useStateValue()

	return (
		<Formik
			initialValues={{
				type: 'Hospital',
				date: '',
				description: '',
				specialist: '',
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

				if (!values.discharge.date || !values.discharge.criteria) {
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

						<Fragment>
							<h3>Hospital Discharge</h3>
							<Field
								name='discharge.date'
								label='date'
								placeholder='YYYY-MM-DD'
								component={TextField}
							/>
							<Field
								name='discharge.criteria'
								label='criteria'
								placeholder='Discharge criteria'
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

export default HospitalForm
