import React from 'react'
import { Button } from 'semantic-ui-react'
import { Formik, Form, Field } from 'formik'
import { SelectEntryField, TextField } from './EntryFormFields'
import { NumberField } from '../AddPatientModal/FormField'
// import { HealthCheckEntry } from '../types'
// import { TextField } from '../AddPatientModal/FormField'

// type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>

// interface FormProps {
// 	onSubmit: (formValues: NewHealthCheckEntry) => void
// }

// Formik wrapping your form can be seen as a context wrapper for your form to use

const AddEntryForm = () => {
	return (
		<Formik
			initialValues={{
				type: 'HealthCheck',
				description: '',
				date: '',
				specialist: '',
				healthCheckRating: '',
			}}
			onSubmit={(data) => {
				console.log(data)
			}}
		>
			{({ values }) => {
				return (
					<Form className='form ui'>
						<Field name='type' label='type' component={SelectEntryField} />

						<Field
							name='date'
							label='date'
							placeholder='YYYY-MM-DD'
							component={TextField}
						/>

						<Field
							name='description'
							label='description'
							placeholder='description'
							component={TextField}
						/>

						<Field
							name='specialist'
							label='specialist'
							placeholder='specialist'
							component={TextField}
						/>

						{values.type === 'HealthCheck' && (
							<Field
								label='healthCheckRating'
								name='healthCheckRating'
								component={NumberField}
								min={0}
								max={3}
							/>
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
