import patientData from '../../data/patients.json'
import { Patient, nonSensitivePatient, newPatient } from '../types';
import {v1 as uuid} from 'uuid';



const getPatients = (): Array<Patient> => {
    return patientData;
};

const getNonSensitivePatient = (): nonSensitivePatient[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        };
    });
};

// Adds patient to patient data
// The newPatient type is made to accept the data from the body (which comes without an ID)
const addNewPatient = (patient: newPatient) : Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };

    patientData.push(newPatient)

    return newPatient
};

export { getPatients, getNonSensitivePatient, addNewPatient }

