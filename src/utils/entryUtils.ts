import { v1 as uuid } from 'uuid'

// Get entry object
// Check the type of the entry ( Occupational | HealthCheck | Hospital )
// Check if the object has the required fields for the corresponding entry

import { Entry } from '../types'

const parseNewEntry = (): Entry => {
	const parsedEntry = {
		id: uuid(),
	}

	return parsedEntry
}

export { parseNewEntry }
