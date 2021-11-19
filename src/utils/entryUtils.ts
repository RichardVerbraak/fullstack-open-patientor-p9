import { v1 as uuid } from 'uuid'
import { Entry, newEntry } from '../types'

// Get entry object
// Check the type of the entry ( Occupational | HealthCheck | Hospital )
// Check if the object has the required fields for the corresponding entry

const parseNewEntry = () => {
	const parsedEntry = {
		id: uuid(),
	}

	return parsedEntry
}

export { parseNewEntry }
