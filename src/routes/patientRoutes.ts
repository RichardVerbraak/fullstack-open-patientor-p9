import express from 'express'
import {
	getNonSensitivePatient,
	getSinglePatient,
	addNewPatient,
	// addNewEntry,
} from '../services/patientService'
import { parseNewEntry } from '../utils/entryUtils'
import { parseNewPatient } from '../utils/patientUtils'

const router = express.Router()

//  @desc    Get patient without the SSN field
//  @route   GET /api/patients
router.get('/', (_req, res) => {
	const nonSensitivePatientData = getNonSensitivePatient()
	res.send(nonSensitivePatientData)
})

//  @desc    Get single patient's info
//  @route   GET /api/patients/:id
router.get('/:id', (req, res) => {
	const id = req.params.id

	try {
		const foundPatient = getSinglePatient(id)

		res.status(200)
		res.send(foundPatient)
	} catch (error) {
		res.status(404)
		res.send(`No user with ID ${id} exists`)
	}
})

//  @desc    Add an entry to a patient
//  @route   POST /api/patients/:id/entries
router.post('/:id/entries', (req, res) => {
	try {
		const patientID = req.params.id

		// Check for patient first and then parse entry

		// Parse the entry to check if the required fields are present for each entry
		const parsedEntry = parseNewEntry(req.body)

		// Add the parsed entry to said patient
		// const newEntry = addNewEntry(patientID, parsedEntry)

		// Return the updated patient or entry?
	} catch (error) {
		const basicErrorMessage = 'Something went wrong'

		if (error instanceof Error) {
			const fullErrorMessage = `${basicErrorMessage}, Error: ${error.message}`
			res.status(400)
			res.send(fullErrorMessage)
		}

		res.status(400)
		res.send(basicErrorMessage)
	}
})

//  @desc    Add a new patient
//  @route   POST /api/patients
router.post('/', (req, res) => {
	try {
		// Parse body content
		const parsedPatient = parseNewPatient(req.body)

		// Add patient to the hardcoded data with random unique id
		const newPatient = addNewPatient(parsedPatient)

		res.status(200)
		res.send(newPatient)
	} catch (error) {
		const basicErrorMessage = 'Something went wrong'

		if (error instanceof Error) {
			const fullErrorMessage = `${basicErrorMessage}, Error: ${error.message}`
			res.status(400)
			res.send(fullErrorMessage)
		}

		res.status(400)
		res.send(basicErrorMessage)
	}
})

export default router
