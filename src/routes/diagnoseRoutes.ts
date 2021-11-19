import express from 'express'
import { getDiagnoses } from '../services/diagnoseService'

const router = express.Router()

//  @desc    Get all of the diagnoses data
//  @route   GET /api/diagnoses
router.get('/', (_req, res) => {
	const diagnoses = getDiagnoses()
	res.send(diagnoses)
})

export default router
