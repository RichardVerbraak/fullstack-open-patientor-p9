import express from 'express';
import { getNonSensitivePatient, addNewPatient } from '../services/patientService';
import { parseNewPatient } from '../utils';

const router = express.Router();

// Get patients without ssn field
router.get('/', (_req, res) => {
   const nonSensitivePatientData = getNonSensitivePatient()
   res.send(nonSensitivePatientData);
});

// Post patient which gets parsed and returned
router.post('/', (req, res) => {
   const {name, dateOfBirth, ssn, gender, occupation} = req.body

   console.log(req.body)

   // Parse body contents
   const parsedPatient = parseNewPatient({name, dateOfBirth, ssn, gender, occupation})

   // Add patient to the hardcoded data with random unique id
   const newPatient = addNewPatient(parsedPatient)

   res.send(newPatient)
});


export default router