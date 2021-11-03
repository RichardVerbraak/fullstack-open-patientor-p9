import express from 'express';
import cors from 'cors';
import patientRouter from './routes/patientRoutes';
import diagnoseRouter from './routes/diagnoseRoutes';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
    console.log('pinged');
    res.send('ping');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});