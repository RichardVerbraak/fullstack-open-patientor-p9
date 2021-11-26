import React from 'react'
import { Button } from 'semantic-ui-react'
import { Formik, Form, Field } from 'formik'
import { SelectEntryField, TextField } from './EntryFormFields'
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
				type: '',
				description: '',
				date: '',
				specialist: '',
				healthCheckRating: '',
			}}
			onSubmit={(data) => {
				console.log(data)
			}}
		>
			{() => {
				return (
					<Form className='form ui'>
						<Field name='type' label='type' component={SelectEntryField} />
						<Field
							name='description'
							label='description'
							component={TextField}
						/>
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
