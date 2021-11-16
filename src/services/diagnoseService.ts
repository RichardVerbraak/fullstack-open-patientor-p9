import diagnoseData from '../../data/diagnoses.json'
import { Diagnosis } from '../types'

const getDiagnoses = (): Array<Diagnosis> => {
	return diagnoseData
}

export { getDiagnoses }
