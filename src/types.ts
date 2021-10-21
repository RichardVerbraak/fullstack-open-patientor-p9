export interface Diagnose {
    code: string,
    name: string,
    latin?: string;
};

export interface Patient {
    id: number,
    name: string,
    dateOfBirth: string,
    ssn: number,
    gender: string,
    occupation: string
};