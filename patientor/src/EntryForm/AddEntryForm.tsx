import React from 'react'
// import { Grid, Button } from 'semantic-ui-react'
import { Formik, Form, Field } from 'formik'
import { TextField } from './EntryFormFields'
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
				test: '',
			}}
			onSubmit={(data) => {
				console.log(data)
			}}
		>
			{() => {
				return (
					<Form className='form ui'>
						<Field name='test' label='test' component={TextField} />
					</Form>
				)
			}}
		</Formik>
	)
}

export default AddEntryForm
