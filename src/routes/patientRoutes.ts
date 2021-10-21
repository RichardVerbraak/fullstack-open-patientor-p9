import express from 'express';
import { getNonSensitivePatient } from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
   const nonSensitivePatientData = getNonSensitivePatient()
   res.send(nonSensitivePatientData);
});


export default router