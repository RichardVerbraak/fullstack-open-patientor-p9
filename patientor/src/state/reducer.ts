import { State } from './state'
import { Diagnosis, Patient } from '../types'

export type Action =
	| {
			type: 'SET_PATIENT_LIST'
			payload: Patient[]
	  }
	| {
			type: 'ADD_PATIENT'
			payload: Patient
	  }
	| {
			type: 'SET_SINGLE_PATIENT'
			payload: Patient
	  }
	| {
			type: 'SET_DIAGNOSES'
			payload: Diagnosis[]
	  }

export const setPatientList = (patientArray: Patient[]): Action => {
	return {
		type: 'SET_PATIENT_LIST',
		payload: patientArray,
	}
}

export const addPatient = (patient: Patient): Action => {
	return {
		type: 'ADD_PATIENT',
		payload: patient,
	}
}

export const setSinglePatient = (patient: Patient): Action => {
	return {
		type: 'SET_SINGLE_PATIENT',
		payload: patient,
	}
}

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
	return {
		type: 'SET_DIAGNOSES',
		payload: diagnoses,
	}
}

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_PATIENT_LIST':
			// Spread out object from the reduce and merge it with the previous ...state.patients
			// Reduce is used to create an object full of patients with their ID by --
			// Iterate over the patients, add to an empty object but with their ID as the key and the rest of the patient obj as the value
			return {
				...state,
				patients: {
					...action.payload.reduce(
						(memo, patient) => ({ ...memo, [patient.id]: patient }),
						{}
					),
					...state.patients,
				},
			}
		case 'ADD_PATIENT':
			return {
				...state,
				patients: {
					...state.patients,
					[action.payload.id]: action.payload,
				},
			}
		case 'SET_SINGLE_PATIENT':
			return {
				...state,
				patient: action.payload,
			}
		case 'SET_DIAGNOSES':
			return {
				...state,
				diagnoses: action.payload,
			}

		default:
			return state
	}
}
