import React from 'react'
import { Field } from 'formik'
import { Form } from 'semantic-ui-react'

const TextField = ({ value, name }: { value: string; name: string }) => {
	return (
		<Form.Field>
			<Field value={value} name={name} />
		</Form.Field>
	)
}

export { TextField }
