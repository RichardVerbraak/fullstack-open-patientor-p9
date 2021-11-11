import patients from '../../data/patients';
import { Patient, nonSensitivePatient } from '../types';


// Get all patients
const getPatients = (): Patient[] => {
    return patients;
};

// Get patient by ID
const getSinglePatient = (id: string) : Patient => {
    const foundPatient = patients.find((patient) => {
        console.log(patient)
        return patient.id === id
    })

    return foundPatient as Patient
}

const getNonSensitivePatient = (): nonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
            entries: []
        };
    });
};

// Adds patient to patient data
// The newPatient type is made to accept the data from the body (which comes without an ID)
const addNewPatient = (patient: Patient) : Patient => {
    patients.push(patient);

    return patient;
};

export { getPatients, getSinglePatient, getNonSensitivePatient, addNewPatient };

