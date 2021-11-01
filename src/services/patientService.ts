import patients from '../../data/patients'
import { Patient, nonSensitivePatient, newPatient } from '../types';
import {v1 as uuid} from 'uuid';

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitivePatient = (): nonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => {
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

    patients.push(newPatient)

    return newPatient
};

export { getPatients, getNonSensitivePatient, addNewPatient }

