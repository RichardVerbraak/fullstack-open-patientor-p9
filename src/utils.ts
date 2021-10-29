import { newPatient } from "./types"

const parseNewPatient = (patientData: unknown) : newPatient => {
    const parsedPatient = {
        name: parseString(name),
        dateOfBirth,
        ssn,
        gender,
        occupation
    }

    return parsedPatient;
}

const isString = ((name: any) : name is string => {
    return typeof name === 'string' || name instanceof String 
})

const parseString = ((name: unknown) : string => {
    if(!name || !isString(name)) {
        throw new Error(`Missing name or invalid data`)
    }

    return name
})

export { parseNewPatient }