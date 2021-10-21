import express from 'express';
import patientRouter from './routes/patientRoutes';
import diagnoseRouter from './routes/diagnoseRoutes';

const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
    console.log('pinged');
    res.send('ping');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});