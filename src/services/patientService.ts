import patients from '../../data/patients'
import { Patient, nonSensitivePatient, Entry } from '../types'

// Get all patients
const getPatients = (): Patient[] => {
	return patients
}

// Get patient by ID
const getSinglePatient = (id: string): Patient => {
	const foundPatient = patients.find((patient) => {
		return patient.id === id
	})

	return foundPatient as Patient
}

// Returns the patient without the SSN field by mapping over the array and creating an array of objects without said property
const getNonSensitivePatient = (): nonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
		return {
			id,
			name,
			dateOfBirth,
			gender,
			occupation,
			entries: [],
		}
	})
}

// Adds patient to patient data
// The newPatient type is made to accept the data from the body (which comes without an ID)
// But now the patient first gets parsed fully and receives an ID in the patientUtils file, this now is just a regular Patient type
const addNewPatient = (patient: Patient): Patient => {
	patients.push(patient)

	return patient
}

// Find patient => add entry => return the entry
const addNewEntry = (id: string, entry: Entry): Entry => {
	const foundPatient = patients.find((patient) => {
		return patient.id === id
	})

	if (foundPatient) {
		foundPatient.entries.push(entry)
	}

	// Still need to update the patient in the patient array
	// {...patient, foundPatient}

	console.log(foundPatient)

	return entry
}

export {
	getPatients,
	getSinglePatient,
	getNonSensitivePatient,
	addNewPatient,
	addNewEntry,
}
