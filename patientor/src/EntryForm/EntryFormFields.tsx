import React from 'react'
import { Field, FieldProps } from 'formik'
import { Form } from 'semantic-ui-react'

// FieldProps are all the props passed to a Formik Field (handleChange, handleBlur, value, placeholder etc.)
// It's easier to use them else you'll have to destructure props like handleChange as handleChange: (value: string) => void
// That's why you spread out all of these props onto the field instead of one by one like the above
interface TextInput extends FieldProps {
	label: string
	placeholder: string
}

// Field is the same as an html input (it's hooked up to Formiks state via the name attribute)
// The field PROP is an object containing onChange, onBlur, name and value
const TextField = ({ label, placeholder, field }: TextInput) => {
	return (
		<Form.Field>
			<label>{label}</label>
			<Field placeholder={placeholder} {...field} />
		</Form.Field>
	)
}

export { TextField }
