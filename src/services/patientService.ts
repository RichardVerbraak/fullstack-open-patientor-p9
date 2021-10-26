import patientData from '../../data/patients.json'
import { Patient, nonSensitivePatient } from '../types';


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

export { getPatients, getNonSensitivePatient }

