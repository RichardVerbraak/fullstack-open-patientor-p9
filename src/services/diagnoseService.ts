import diagnoseData from '../../data/diagnoses.json'
import { Diagnosis } from '../types'

// Gets the hardcoded diagnoses data
const getDiagnoses = (): Array<Diagnosis> => {
	return diagnoseData
}

export { getDiagnoses }
