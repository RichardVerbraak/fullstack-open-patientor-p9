import express from 'express';
import { getNonSensitivePatient, getSinglePatient, addNewPatient } from '../services/patientService';
import { parseNewPatient } from '../utils';

const router = express.Router();

// Get patients without ssn field
router.get('/', (_req, res) => {
   const nonSensitivePatientData = getNonSensitivePatient();
   res.send(nonSensitivePatientData);
});

// Returns all info of one patient (including the entries)
router.get('/:id', (req, res) => {
   const id = req.params.id

   try {
      const foundPatient = getSinglePatient(id)

      res.status(200)
      res.send(foundPatient)
   } catch (error) {
      res.status(404)
      res.send(`No user with ID ${id} exists`)
   }   
})

// Post patient which gets parsed and returned
router.post('/', (req, res) => {
   try {
      // Parse body content
      const parsedPatient = parseNewPatient(req.body);

      // Add patient to the hardcoded data with random unique id
      const newPatient = addNewPatient(parsedPatient);

      res.status(200);
      res.send(newPatient);
   } catch (error) {
      const basicErrorMessage = 'Something went wrong';

        if(error instanceof Error) {
          const fullErrorMessage = `${basicErrorMessage}, Error: ${error.message}`;
          res.status(400);
          res.send(fullErrorMessage);
        }

        res.status(400);
        res.send(basicErrorMessage);
   }  
});


export default router;